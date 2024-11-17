import { Component, OnInit } from '@angular/core';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneRequestDto } from '../../model/prenotazioneRequest';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  constructor(private sharedBigliettiService : SharedBigliettiService, private prenotazioneService : PrenotazioneService, private spettacoloService : SpettacoloService){}
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
      this.prenotazioneService.prenota(this.prenotazione)
    }
    
    
  }
}
