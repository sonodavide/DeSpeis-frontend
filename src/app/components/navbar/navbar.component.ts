import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keyclock/keyclock.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private keycloakService : KeycloakService){}
  loggato = false

  ngOnInit() : void {
    if(this.keycloakService.keycloak.authenticated){
      this.loggato=true
    }
  }
  isAdmin() : boolean {
    if(this.keycloakService.keycloak.authenticated){
      return this.keycloakService.hasRole("admin")
    }
    return false
  }

  login() : Promise<void> {
    return this.keycloakService.login()
  }

  logout() : Promise<void> {
    return this.keycloakService.logout()
  }
}
