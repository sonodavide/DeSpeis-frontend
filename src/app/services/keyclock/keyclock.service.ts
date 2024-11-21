import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../../model/user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined
  private _profile: UserProfile | undefined

  get keycloak(){
    if(!this._keycloak){
      this._keycloak= new Keycloak({
          url: 'http://localhost:8080',
          
          realm: 'spero',
          clientId: 'fronte'
      })
    }
    return this._keycloak
  }
  get profile(): UserProfile | undefined {
    return this._profile;
  }
  login(redirectUri: string = window.location.href){
    return this.keycloak.login({
      redirectUri: redirectUri // Specifica dove deve andare dopo il login
    })
  }
  logout(){
    return this.keycloak.logout({redirectUri:'http://localhost:4200'})
  }

  manageAccount(){
    this.keycloak.accountManagement();
  }
  constructor() { }

  async init(){
    
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      
    });
    
    if(authenticated){
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      console.log(this.keycloak.token)
      console.log(this._profile.username)
      console.log("sei loggato.")
    }
  }

  hasRole(role: string) {
    return this.keycloak.hasRealmRole(role) ||this.keycloak.hasResourceRole(role);
  }
}