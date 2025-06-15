import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrenotazioneRequestDto } from '../model/prenotazioneRequest';
import { PostispettacoloDto } from '../model/postiSpettacolo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private apiUrl = 'http://localhost:9999/prenotazione';  // Cambia con il tuo URL del backend

  constructor(private http: HttpClient) { }

  prenota(prenotazioneRequest: PrenotazioneRequestDto): Observable<PostispettacoloDto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PostispettacoloDto[]>(`${this.apiUrl}/prenota`, prenotazioneRequest, { headers });
  }
  
}
