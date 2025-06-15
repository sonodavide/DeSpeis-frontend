import { Inject, Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../model/user-profile";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined
  private _profile: UserProfile | undefined

  get keycloak(){
    if(!this._keycloak){
      this._keycloak= new Keycloak({
          url: this.keycloakUrl,
          
          realm: this.keycloakRealm,
          clientId: this.keycloakClientId
      })
    }
    return this._keycloak
  }
  get profile(): UserProfile | undefined {
    return this._profile;
  }
  login(redirectUri: string = window.location.href){
    return this.keycloak.login({
      redirectUri: redirectUri 
    })
  }
  logout(){
    return this.keycloak.logout({redirectUri:'http://localhost:4200'})
  }

  manageAccount(){
    this.keycloak.accountManagement().then(
      () => {
        this.router.navigate(['/account'])
      }
    );
  }
  constructor(@Inject('KEYCLOAK_URL') private readonly keycloakUrl: string, @Inject('KEYCLOAK_REALM') private readonly keycloakRealm: string, @Inject('KEYCLOAK_CLIENT_ID') private readonly keycloakClientId: string, private router : Router) { }

  updateToken(){
    if(this.keycloak){
      this.keycloak.updateToken()
    }
  }
  async init(){
    
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      
    });
    
    if(authenticated){
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      

    }
  }

  hasRole(role: string) {
    return this.keycloak.hasRealmRole(role) ||this.keycloak.hasResourceRole(role);
  }
}