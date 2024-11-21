import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { KeycloakService } from '../services/keyclock/keyclock.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;

  const hasRole = keycloakService.keycloak.hasResourceRole(requiredRole) ||
    keycloakService.keycloak.hasRealmRole(requiredRole);

  if (!hasRole) {
    router.navigate(["http://localhost:4200"])
    return false;
  }
  return true;
};
