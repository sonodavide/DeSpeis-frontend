import { Component } from '@angular/core';
import { NumeriUtiliService } from '../../services/numeri-utili.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {
  constructor(private router: Router, private numeriUtiliService : NumeriUtiliService) {}
  numeroFilm: number = 0;
  numeroRegisti: number = 0;
  numeroAttori: number = 0;
  numeroGeneri: number = 0;
  numeroBiglietti: number = 0;
  numeroUtenti: number = 0;
  incassiTotali: number = 0; // Sostituisci con il calcolo appropriato
  numeroOrdini: number = 0;
  numeroSpettacoli: number = 0;
  numeroSale: number = 0;
  ngOnInit(): void {
    this.caricaDati()
  }

  caricaDati(): void {
    this.numeriUtiliService.getNumeroFilms().subscribe(data => this.numeroFilm = data);
    this.numeriUtiliService.getNumeroRegisti().subscribe(data => this.numeroRegisti = data);
    this.numeriUtiliService.getNumeroAttori().subscribe(data => this.numeroAttori = data);
    this.numeriUtiliService.getNumeroGeneri().subscribe(data => this.numeroGeneri = data);
    this.numeriUtiliService.getNumeroBiglietti().subscribe(data => this.numeroBiglietti = data);
    this.numeriUtiliService.getNumeroUtenti().subscribe(data => this.numeroUtenti = data);
    this.numeriUtiliService.getNumeroOrdini().subscribe(data => this.numeroOrdini = data);
    this.numeriUtiliService.getNumeroSpettacoli().subscribe(data => this.numeroSpettacoli = data);
    this.numeriUtiliService.getNumeroSale().subscribe(data => this.numeroSale = data);
    this.numeriUtiliService.getIncassiTotali().subscribe(data => this.incassiTotali=data)
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
