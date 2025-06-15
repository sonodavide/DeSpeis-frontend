import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  console.log("kiao")
  
  if (!tokenService.keycloak.authenticated ||tokenService.keycloak.isTokenExpired()) {
    console.log(tokenService.profile?.firstName)
    tokenService.login(`${window.location.origin}${state.url}`)
    console.log("token expirato")
    return false;
  }
  console.log("token non expirato")
  return true;
};
