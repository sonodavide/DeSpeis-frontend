import { Component, OnInit } from '@angular/core';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { PrenotazioneService } from '../../services/prenotazione.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  constructor(private sharedBigliettiService : SharedBigliettiService, private prenotazioneService : PrenotazioneService){}
  cardholderName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  posti: number[] = []
  ngOnInit(){
    this.getPosti()
  }
  getPosti(): void {
    this.sharedBigliettiService.currentData.subscribe(data => {this.posti = data})
  }
  totalAmount: number = this.calculateTotal();

  calculateTotal(): number {
    return 0
  }

  submitPayment() {
    // Logica per inviare i dati di pagamento
    console.log('Pagamento in corso...');
  }
}
