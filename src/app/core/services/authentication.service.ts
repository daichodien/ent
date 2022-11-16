import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'
import { environment } from '../../../environments/environment';
import { Globalconst, Helpers } from '../helpers';
import { ApplicationHttpClient } from './_base/http-client';
import { tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class AuthenticationService {
    private redirectUrl: string = '/';
    private loginUrl: string = '/login';
    private loggedInUser: any;

    constructor(private http: Http
        , private _global: Globalconst
        , private httpClient: ApplicationHttpClient) { }

    public login(username: string, password: string, ip: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', username);
        urlSearchParams.append('password', password);
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('ip', ip);
        urlSearchParams.append('client_Id', this._global.SYSTEM_ID);
        let data = urlSearchParams.toString();
        let urlpost = environment.urlServiceSSO + 'token';

        return this.http.post(urlpost, data, { headers: headers })
            .map((response: Response) => {
                let dataObj = response;

                if (dataObj.hasOwnProperty('_body')) {
                    let user = JSON.parse(dataObj['_body'].valueOf());

                    if (user) {
                        user.userid = username;
                        user.employeeId = user['as:employee_id']
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        return user;
                    }

                } else {
                    let data: any = {};
                    data.error = 'Username or password is incorrect'
                    return data;
                }
            });
    }

    changePassword(model: any) {
        let urlpost = environment.urlServiceSSO + 'api/authentication' + '/changepassword';
        return this.httpClient.Post(urlpost, model).map((response: Response) => response);
    }

    isUserLoggedIn(): boolean {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        return user != null;
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getLoginUrl(): string {
        return this.loginUrl;
    }

    getLoggedInUser(): any {
        return this.loggedInUser;
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        // localStorage.removeItem('currentmenus');
        // localStorage.removeItem('imgAvatar');
        localStorage.clear();
    }

    updateUserProfile() {
        const url = '';
    }
    public refeshTokenAsync() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/x-www-form-urlencoded');
        const authenInfo: any = JSON.parse(localStorage.getItem('currentUser'));
        const urlParams = new URLSearchParams();
        urlParams.append('refresh_token', authenInfo.refresh_token);
        urlParams.append('grant_type', "refresh_token");
        urlParams.append('client_id', this._global.SYSTEM_ID);
        const data = urlParams.toString();
        const urlpost = environment.urlServiceSSO + 'token';
        return this.http.post(urlpost, data).pipe(tap((tokens: any) => {
           // Helpers.setLocalStorage('currentUser', JSON.parse(tokens['_body']));
        }, error => {
            return throwError(error);
        }));
    }
}
