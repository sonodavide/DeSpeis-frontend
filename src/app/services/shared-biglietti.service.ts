import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrenotazioneRequestDto } from '../model/prenotazioneRequest';

@Injectable({
  providedIn: 'root'
})
export class SharedBigliettiService {
  private dataArray = new BehaviorSubject<PrenotazioneRequestDto | null>(
    this.getStoredData() // Recupera i dati salvati se presenti
  );
  currentData = this.dataArray.asObservable();

  private getStoredData(): PrenotazioneRequestDto | null {
    const stored = localStorage.getItem('prenotazione');
    return stored ? JSON.parse(stored) : null;
  }

  updateData(prenotazione: PrenotazioneRequestDto) {
    this.dataArray.next(prenotazione);
    // Salva i dati nel localStorage
    localStorage.setItem('prenotazione', JSON.stringify(prenotazione));
  }

  constructor() {}
}
