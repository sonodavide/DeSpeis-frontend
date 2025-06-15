import { Component } from '@angular/core';

@Component({
  selector: 'app-selezione-posti',
  templateUrl: './selezione-posti.component.html',
  styleUrl: './selezione-posti.component.css'
})
export class SelezionePostiComponent {
  
  posti: { [fila: string]: { numero: number, prenotato: boolean, speciale?: boolean }[] } = {
    'A': [{ numero: 1, prenotato: false}, { numero: 2, prenotato: true }, { numero: 3, prenotato: false }],
    'B': [{ numero: 1, prenotato: false }, { numero: 2, prenotato: false }, { numero: 3, prenotato: true }],
    'C': [{ numero: 1, prenotato: false }, { numero: 2, prenotato: false }, { numero: 3, prenotato: false }],
    'D': [{ numero: 1, prenotato: false }, { numero: 2, prenotato: false }, { numero: 3, prenotato: false }],
    'E': [{ numero: 1, prenotato: true }, { numero: 2, prenotato: true }, { numero: 3, prenotato: false }],
    'F': [{ numero: 1, prenotato: false }, { numero: 2, prenotato: false }, { numero: 3, prenotato: false }],
    'G': [{ numero: 1, prenotato: true }, { numero: 2, prenotato: false }],
    'H': [{ numero: 1, prenotato: false }, { numero: 2, prenotato: false }],
  };

  postiSelezionati: { fila: string, numero: number }[] = [];

  constructor() { }

  ngOnInit(): void {}

  // Funzione per gestire la selezione di un posto
  selezionaPosto(fila: string, numero: number, prenotato: boolean) {
    if (!prenotato) {
      const indicePosto = this.postiSelezionati.findIndex(p => p.fila === fila && p.numero === numero);
      if (indicePosto === -1) {
        this.postiSelezionati.push({ fila, numero });
      } else {
        this.postiSelezionati.splice(indicePosto, 1);
      }
    }
  }

  isPostoSelezionato(fila: string, numero: number): boolean {
    return this.postiSelezionati.some(p => p.fila === fila && p.numero === numero);
  }

  getFilas() {
    return Object.keys(this.posti);
  }
}
