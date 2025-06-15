import { Component } from '@angular/core';
import { SpettacoloDto } from '../../model/spettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { formatDate } from '@angular/common';
import { FilmSpettacoliDto } from '../../model/filmSpettacoli';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-spettacoli',
  templateUrl: './spettacoli.component.html',
  styleUrl: './spettacoli.component.css'
})
export class SpettacoliComponent {

  filmSpettacoli: FilmSpettacoliDto[] = [];
  giorniSettimana: { label: string, date: string }[] = [];
  dataSelezionata: string = '';

  constructor(private spettacoloService: SpettacoloService, private router: Router, private messageService : MessagesService) {}

  ngOnInit(): void {
    this.generaGiorniSettimana(); 
    this.selezionaGiorno(this.giorniSettimana[0].date); 

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
    this.spettacoloService.getByDate(date).subscribe({
      next : data => this.filmSpettacoli = data,
      error : error => this.messageService.addMessageError("Errore caricamento spettacoli")

    })
   }
   goToSelezionePosti(spettacoloId: number) {
    this.router.navigate(['/selezione-posti', spettacoloId]);  
    }
  // Metodo per formattare l'orario in maniera più leggibile
  formatTime(time: string): string {
    return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
  }

  selezionaGiorno(date: string) {
    this.dataSelezionata = date;
    this.getSpettacoli(date);  
  }
}
