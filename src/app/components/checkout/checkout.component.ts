import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneRequestDto } from '../../model/prenotazioneRequest';
import { MessagesService } from '../../services/messages.service';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  
  constructor(
    private sharedBigliettiService: SharedBigliettiService,
    private prenotazioneService: PrenotazioneService,
    private spettacoloService: SpettacoloService,
    private messageService: MessagesService,
    private router : Router
  ) {}
  proprietarioCarta: string = '';
  numeroCarta: string = '';
  dataScadenza: string = '';
  cvv: string = '';
  prenotazione: PrenotazioneRequestDto | null = null;
  totale: number = 0;
  ngOnInit() {
    this.getPrenotazione();
  }
  getPrenotazione(): void {
    this.sharedBigliettiService.currentData.subscribe((response) => {
      if (response) {
        this.prenotazione = response;
        this.spettacoloService
          .getByIdAcquistabile(this.prenotazione?.spettacoloId)
          .subscribe({
            next: (spettacolo) => {
              this.totale =
                this.prenotazione!.postiIds.length * spettacolo.prezzo;
            },
            error: (error) => {
              if (error.status === 404) {
                this.messageService.addMessageError(
                  'Impossibile trovare lo spettacolo richiesto'
                );
              } else {
                this.messageService.addMessageError(
                  'si è verificato un errore.'
                );
              }
            },
          });
      }
    });
  }

  private isData(data : string): boolean{
    
      const regex = /^\d{2}\/\d{2}$/;
      return regex.test(data);
    
  }

  private isCVV(cvv: string): boolean {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  }
  private  isCreditCardFormatValid(cardNumber: string): boolean {
    const regex = /^\d{4}[\s|-]?\d{4}[\s|-]?\d{4}[\s|-]?\d{4}$/;
    return regex.test(cardNumber);
  }
  private compilato() : boolean {
    if(this.proprietarioCarta.trim()==="") return false;
    if(!this.isCreditCardFormatValid(this.numeroCarta)) return false;
    if(isNaN(Number(this.numeroCarta.trim()))) return false
    if(!this.isData(this.dataScadenza)) return false;
    if(!this.isCVV(this.cvv)) return false;

    return true;
  }
  submitPayment() {
    if (this.compilato()) {
      if (this.prenotazione) {
        this.prenotazione.prezzo=this.totale
        this.prenotazioneService.prenota(this.prenotazione).subscribe({
          next: () => {
            this.messageService.addMessageSuccess(
              'posti prenotati con succeso'
            );
            this.router.navigate(['/utente/biglietti'])
          },
          error: (error) => {
            if (error.status === 400) {
              this.messageService.addMessageError('alcuni dati non vanno bene');
            } else if (error.status === 409) {
              this.messageService.addMessageError('posti già prenotati');
            } else {
              this.messageService.addMessageError(
                'errore durante la prenotazione'
              );
            }
            this.ngOnInit()
          },
        });
      }
    } else {
      alert("Non hai compilato bene tutti i campi!")
    }
  }
  
}
