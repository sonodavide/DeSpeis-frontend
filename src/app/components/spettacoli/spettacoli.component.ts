import { Component } from '@angular/core';
import { SpettacoloDto } from '../../model/spettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-spettacoli',
  templateUrl: './spettacoli.component.html',
  styleUrl: './spettacoli.component.css'
})
export class SpettacoliComponent {
  spettacoli: SpettacoloDto[] = [];
  giorniSettimana: { label: string, date: string }[] = [];
  dataSelezionata: string = '';

  constructor(private spettacoloService: SpettacoloService) {}

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

  // Metodo per ottenere gli spettacoli per una determinata data
  getSpettacoli(date: string): void {
    this.dataSelezionata = date; // Aggiorna la data selezionata
    this.spettacoloService.getByDate(date).subscribe(
      (data: SpettacoloDto[]) => {
        this.spettacoli = data;
      },
      (error) => {
        console.error('Errore nel recuperare gli spettacoli', error);
        this.spettacoli = [];
      }
    );
  }

  // Metodo per formattare l'orario in maniera più leggibile
  formatTime(time: string): string {
    return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
  }
}
