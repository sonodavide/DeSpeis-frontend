import { Component, OnInit } from '@angular/core';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneRequestDto } from '../../model/prenotazioneRequest';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  constructor(private sharedBigliettiService : SharedBigliettiService, private prenotazioneService : PrenotazioneService, private spettacoloService : SpettacoloService, private messageService : MessagesService){}
  cardholderName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  prenotazione : PrenotazioneRequestDto | null = null;
  spettacolo : SpettacoloService | null = null;
  
  ngOnInit(){
    this.getPrenotazione()
    
  }
  getPrenotazione(): void {
    this.sharedBigliettiService.currentData.subscribe(response => {
      if(response){
        this.prenotazione=response;
      }
    })
  }
  totalAmount: number = this.calculateTotal();

  calculateTotal(): number {
    return 0
  }

  
  submitPayment() {
    if(this.prenotazione){
      this.prenotazioneService.prenota(this.prenotazione).subscribe({
        next : () => {
          this.messageService.addMessageSuccess("posti prenotati con succeso")
        },
        error : (error) => {
          if(error.status === 400){
            this.messageService.addMessageError("alcuni dati non vanno bene")
          }else if(error.status === 409){
            this.messageService.addMessageError("posti già prenotati")
          } else {
            this.messageService.addMessageError("errore durante la prenotazione")
          }
        }
      })
    }
    
    
  }
}
