import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';
import { KeycloakService } from '../../services/keycloak.service';
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../model/film';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private testService : TestService, private keycloakService : KeycloakService, private filmService : FilmService, private messageService : MessagesService){}
  films : FilmDto[] = []
  ngOnInit() : void {
    console.log(this.testService.test().subscribe())
    if(this.keycloakService.keycloak.authenticated && this.keycloakService.keycloak.tokenParsed && this.keycloakService.keycloak.clientId){
      let roles = this.keycloakService.keycloak.tokenParsed['resource_access']?.[this.keycloakService.keycloak.clientId]?.['roles'] || []
      console.log(roles)
      
    }
    this.filmService.ultimeUscite().subscribe({
      next : (response) => {
        this.films=response
      },
      error : () => {
        this.messageService.addMessageError("errore caricamento ultime uscite")
      }
    })
  }

  

}
