import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  
  if (!tokenService.keycloak.authenticated ||tokenService.keycloak.isTokenExpired()) {
    tokenService.login(`${window.location.origin}${state.url}`)
    return false;
  }

  return true;
};
