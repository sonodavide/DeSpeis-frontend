import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdineDto } from '../../model/ordineDto';
import { BigliettoDto } from '../../model/bigliettoDto';
import { UserProfile } from '../../model/user-profile';
import { OrdineService } from '../../services/ordine.service';
import { BigliettoService } from '../../services/biglietto.service';
import { UtenteService } from '../../services/utente.service';
import { FormatterUtils} from '../../utils/formatterUtils';
import { KeycloakService } from '../../services/keycloak.service';
import { MessagesService } from '../../services/messages.service';
@Component({
  selector: 'app-utente-homepage',
  templateUrl: './utente-homepage.component.html',
  styleUrl: './utente-homepage.component.css'
})
export class UtenteHomepageComponent {
  
  utente: UserProfile = { 
    id: '', 
    username: '', 
    firstName: '', 
    lastName: '', 
    email: ''
  };
  biglietti : BigliettoDto[] = []
  ordini : OrdineDto[] = []
  constructor(private router: Router, private utenteService : UtenteService, private bigliettoService : BigliettoService, private ordineService : OrdineService, private keycloakService : KeycloakService, private messageService : MessagesService) {
  }

  ngOnInit(): void {
    this.keycloakService.updateToken()
    this.utenteService.updateUser().subscribe()
    this.getUtente()
    this.getBigliettiOggi()
    this.getOrdini()
  }
  
  getUtente(){
    this.utente = this.keycloakService.profile!
  }

  getBigliettiOggi(){
    
    this.bigliettoService.getByDate(new Date().toISOString().split('T')[0], 0, 5).subscribe({
      next : biglietti => this.biglietti=biglietti.content,
      error : error => this.messageService.addMessageError("errore caricamento biglietti")

    })
  }

  getOrdini(){ 
    this.ordineService.getOrdini(0, 4).subscribe({
      next : ordini => this.ordini=ordini.content,
      error : error => this.messageService.addMessageError("errore caricamento ordini")
    })
  }

  modificaInfo(): void {
    this.keycloakService.manageAccount()
  }
  
  formatTime(date: string): string{
    return FormatterUtils.formatTime(date)
  }
  bigliettoToString(biglietto : BigliettoDto): string{
    return FormatterUtils.bigliettoToString(biglietto)
  }
}
