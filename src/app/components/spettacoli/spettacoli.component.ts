import { Component } from '@angular/core';
import { SpettacoloDto } from '../../model/spettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { formatDate } from '@angular/common';
import { FilmSpettacoliDto } from '../../model/filmSpettacoli';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spettacoli',
  templateUrl: './spettacoli.component.html',
  styleUrl: './spettacoli.component.css'
})
export class SpettacoliComponent {

  filmSpettacoli: FilmSpettacoliDto[] = [];
  giorniSettimana: { label: string, date: string }[] = [];
  dataSelezionata: string = '';

  constructor(private spettacoloService: SpettacoloService, private router: Router) {}

  ngOnInit(): void {
    this.generaGiorniSettimana(); // Genera le prossime 7 date
    this.getSpettacoli(this.giorniSettimana[0].date); // Richiedi gli spettacoli per "Oggi"

  }

  generaGiorniSettimana(): void {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayLabel = nextDate.toLocaleDateString('it-IT', { weekday: 'short' }); // Giorno abbreviato
      const dateString = formatDate(nextDate, 'yyyy-MM-dd', 'en');
      this.giorniSettimana.push({ label: dayLabel, date: dateString });
    }
  }

  
   getSpettacoli(date: string): void{
    this.spettacoloService.getByDate(date).subscribe(f => this.filmSpettacoli = f)
   }
   goToSelezionePosti(spettacoloId: number) {
    this.router.navigate(['/selezione-posti', spettacoloId]);  // Naviga alla rotta del film con l'ID specifico
    }
  // Metodo per formattare l'orario in maniera più leggibile
  formatTime(time: string): string {
    return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
  }
}
