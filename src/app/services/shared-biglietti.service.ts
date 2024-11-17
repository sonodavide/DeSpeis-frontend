import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrenotazioneRequestDto } from '../model/prenotazioneRequest';

@Injectable({
  providedIn: 'root'
})
export class SharedBigliettiService {
  private dataArray = new BehaviorSubject<PrenotazioneRequestDto | null>(null);
  currentData = this.dataArray.asObservable();

  // Metodo per aggiornare l'oggetto PrenotazioneRequestDto
  updateData(prenotazione: PrenotazioneRequestDto) {
    this.dataArray.next(prenotazione);
  }

  constructor() {}
}
