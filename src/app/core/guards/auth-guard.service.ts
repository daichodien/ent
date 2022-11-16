import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CacheService } from '../services/cache.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router, private cachingService: CacheService) {
  }
  canLoad(route: Route): boolean {
    let url: string = location.pathname;
    if (this.authService.isUserLoggedIn()) {
      
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: url ,logout:true}});
    return false;
  }
} 