import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Helpers } from '../../helpers/helpers';
import { _const } from '../../helpers/constants';
import {AuthenticationService} from '../authentication.service'
import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';

export class AuthService {
  // Assuming this would be cached somehow from a login call.
  public authTokenStale: string; // stale auth token
  public authTokenNew: string; // new_auth_token
  public currentToken: string;

  constructor() {
    this.currentToken = this.authTokenStale;
  }

  getAuthToken() {
    let objData = localStorage.getItem('currentUser');

    if (objData && objData['access_token'])
      this.currentToken = objData['access_token'];
    
    return this.currentToken;
  }

  refreshToken(): Observable<string> {

    //  this.authenticationService.refeshTokenAsync("").then(data=>{
    // 
    //  });
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */

    // this.currentToken = this.authTokenNew;

    return Observable.of(this.authTokenNew).delay(200);
  }
}