import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdineDto } from '../../model/ordineDto';
import { BigliettoDto } from '../../model/bigliettoDto';
import { UserProfile } from '../../model/user-profile';
import { OrdineService } from '../../services/ordine.service';
import { BigliettoService } from '../../services/biglietto.service';
import { UtenteService } from '../../services/utente.service';
import { UtilsFormatter } from '../../utils/utilsFormatter';
import { KeycloakService } from '../../services/keyclock/keyclock.service';
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
  constructor(private router: Router, private utenteService : UtenteService, private bigliettoService : BigliettoService, private ordineService : OrdineService, private keycloakService : KeycloakService) {
  }

  ngOnInit(): void {
    let userId = 1; //test
    this.getUtente(userId)
    this.getBigliettiOggi(userId)
    this.getOrdini(userId)
  }
  
  getUtente(userId : number){
    this.utenteService.getUtente(userId).subscribe(utente => this.utente = utente)
  }

  getBigliettiOggi(userId: number){
    
    this.bigliettoService.getBigliettiByUserAndDate(userId, new Date().toISOString().split('T')[0]).subscribe(biglietti => this.biglietti=biglietti)
  }

  getOrdini(userId: number){ //hardcoded user id
    this.ordineService.getOrdiniByUserPaginated(userId, 0, 4).subscribe(ordini => this.ordini=ordini.content)
  }

  modificaInfo(): void {
    this.keycloakService.manageAccount()
  }
  
  formatTime(date: string): string{
    return UtilsFormatter.formatTime(date)
  }
  bigliettoToString(biglietto : BigliettoDto): string{
    return UtilsFormatter.bigliettoToString(biglietto)
  }
}
