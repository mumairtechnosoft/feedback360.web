import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User, UserManager, UserSettings, WebStorageStateStore } from 'oidc-client';
import { UserManagerSettings } from '../models/auth-client-settings';

@Injectable()
export class AuthenticationService {
  isUserDefined = false;
  private _user!: User | null;
  private _userManager!: UserManager;

  /**
   *
   */
  constructor(private _route: Router) {
  }

  isLoggedIn() {
    const user: string | null = localStorage.getItem('oidc.user:https://localhost:7062:openid');
    if (user != null) {
      this._user = JSON.parse(user??'');
    }

    return this._user != null && !this._user.expired;
  }

  getAccessToken() {
    return this._user ? this._user.access_token : '';
  }

  getClaims() {
    return this._user?.profile;
  }

  startAuthentication(): Promise<void> {
    this.getUserManager();
    return this._userManager.signinRedirect();
  }

  completeAuthentication() {
    this.getUserManager();
    return this._userManager.signinRedirectCallback().then((user) => {
      this._user = user;
      this.isUserDefined = true;
      this._route.navigateByUrl('/');
    });
  }


  startLogout(): Promise<void> {
    debugger;
    this.getUserManager();
    return this._userManager.signoutRedirect();
  }

  completeLogout() {
    debugger;
    this.getUserManager();
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }


  silentSignInAuthentication() {
    this.getUserManager();
    return this._userManager.signinSilentCallback();
  }


  private getUserManager() {
    if (!this._userManager) {
      const userManagerSettings: UserManagerSettings =
        new UserManagerSettings();

      //set up settings
      userManagerSettings.authority = 'https://localhost:7062'; //website that responsible for Authentication
      userManagerSettings.client_id = 'openid'; //uniqe name to identify the project
      userManagerSettings.client_secret = 'openid-secret';
      userManagerSettings.response_type = 'code'; //desired Authentication processing flow - for angular is sutible code flow
      //specify the access privileges, specifies the information returned about the authenticated user.
      userManagerSettings.scope = 'openid';
      
      userManagerSettings.redirect_uri = 'http://localhost:4200/login'; //start login process
      userManagerSettings.post_logout_redirect_uri = 'http://localhost:4200'; //start logout process

      //userManagerSettings.automaticSilentRenew = true;
      //userManagerSettings.silent_redirect_uri = 'http://localhost:4200/silent-callback'; //silent renew oidc doing it automaticly 

      userManagerSettings.userStore = new WebStorageStateStore({
        store: window.localStorage,
      }); // store information about Authentication in localStorage

      this._userManager = new UserManager(userManagerSettings);

      this._userManager.getUser().then((user) => {
        this._user = user;
        this.isUserDefined = true;
      });
    }
  }

}
