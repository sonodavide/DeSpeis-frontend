import { Component } from '@angular/core';
import { NumeriUtiliService } from '../../services/numeri-utili.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {
  constructor(private router: Router, private numeriUtiliService : NumeriUtiliService, private messageService : MessagesService) {}
  numeroFilm: number = 0;
  numeroRegisti: number = 0;
  numeroAttori: number = 0;
  numeroGeneri: number = 0;
  numeroBiglietti: number = 0;
  numeroUtenti: number = 0;
  incassiTotali: number = 0; 
  numeroOrdini: number = 0;
  numeroSpettacoli: number = 0;
  numeroSale: number = 0;
  ngOnInit(): void {
    this.caricaDati()
  }

  caricaDati(): void {
    this.numeriUtiliService.getNumeroFilms().subscribe({
      next: (data) => this.numeroFilm = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero dei film')
    });

    this.numeriUtiliService.getNumeroRegisti().subscribe({
      next: (data) => this.numeroRegisti = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero dei registi')
    });

    this.numeriUtiliService.getNumeroAttori().subscribe({
      next: (data) => this.numeroAttori = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero degli attori')
    });

    this.numeriUtiliService.getNumeroGeneri().subscribe({
      next: (data) => this.numeroGeneri = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero dei generi')
    });

    this.numeriUtiliService.getNumeroBiglietti().subscribe({
      next: (data) => this.numeroBiglietti = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero dei biglietti')
    });

    this.numeriUtiliService.getNumeroUtenti().subscribe({
      next: (data) => this.numeroUtenti = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero degli utenti')
    });

    this.numeriUtiliService.getNumeroOrdini().subscribe({
      next: (data) => this.numeroOrdini = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero degli ordini')
    });

    this.numeriUtiliService.getNumeroSpettacoli().subscribe({
      next: (data) => this.numeroSpettacoli = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero degli spettacoli')
    });

    this.numeriUtiliService.getNumeroSale().subscribe({
      next: (data) => this.numeroSale = data,
      error: () => this.messageService.addMessageError('Impossibile caricare il numero delle sale')
    });

    this.numeriUtiliService.getIncassiTotali().subscribe({
      next: (data) => this.incassiTotali = data,
      error: () => this.messageService.addMessageError('Impossibile caricare gli incassi totali')
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
