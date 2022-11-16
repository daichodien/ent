import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, throwError } from 'rxjs';
import { RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Helpers } from '../../helpers/helpers';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { switchMap, take, filter, catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Globalconst } from '../../helpers';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  timer: any;
  snapshot: RouterStateSnapshot;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // authSvc: AuthenticationService;
  constructor(
    private router: Router
    , private _loadingBar: SlimLoadingBarService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , public authService: AuthService
    , public authSvc: AuthenticationService
    , private injector: Injector
    , public global: Globalconst
    , private route: ActivatedRoute
  ) {
    this.snapshot = router.routerState.snapshot;
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

  public intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingBar.start();
    this.spinner.show();
    let clonedRequest: HttpRequest<any>;
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', this.jwt())
    });
    return next.handle(clonedRequest).pipe(tap((event: HttpEvent<any>) => {
      this._loadingBar.complete();
      this.spinner.hide();
    }), catchError(error => {
      this._loadingBar.complete();
      this.spinner.hide();
      if (error instanceof HttpErrorResponse && error.status === 401) {

        if (localStorage.getItem("currentUser") && JSON.parse(localStorage.getItem("currentUser"))["refresh_token"]) {
          return this.handle401Error(req, next);
        }
        else {
          return this.logoutUser();
        }
      } else {
        return throwError(error);
      }
    }));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authSvc.refeshTokenAsync().pipe(
        switchMap((newToken: any) => {
          if (newToken) {
            this.spinner.hide();
            this._loadingBar.complete();
            const info: any = JSON.parse(newToken['_body']);
            const newInfo = Helpers.getLocalStorage('currentUser');

            newInfo['access_token'] = info['access_token'];
            newInfo['refresh_token'] = info['refresh_token'];
            Helpers.setLocalStorage('currentUser', newInfo);

            this.global.reset();
            this.tokenSubject.next(info['access_token']);
            this.isRefreshingToken = false;
            return next.handle(this.addToken(req, info['access_token']));
          } else {
            return this.logoutUser();
          }
        }), catchError(error => {
          this._loadingBar.complete();
          this.spinner.hide();
          this.logoutUser();
          this.isRefreshingToken = false;
          return throwError(error);
        }));
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null)
        , take(1)
        , switchMap(token => {
          return next.handle(this.addToken(req, token)).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this._loadingBar.complete();
              this.spinner.hide();
              this.isRefreshingToken = false;
              if (this.timer) {
                clearTimeout(this.timer);
              }
            }
          });
        }), catchError(error => {
          this.logoutUser();
          return throwError(error);
        })
        );
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }

    return Observable.throw(error);
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    localStorage.clear();
    this.toastr.error('Your session is expired, please login.', 'Session Timout')
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot["_routerState"]["url"], logout: true } });
    return Observable.throw('');
  }

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      return 'Bearer ' + currentUser.access_token;
    }
    return 'Bearer ';
  }
}
