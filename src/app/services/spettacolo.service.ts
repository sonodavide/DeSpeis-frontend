import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpettacoloDto } from '../model/spettacolo';

@Injectable({
  providedIn: 'root'
})
export class SpettacoloService {
  private apiUrl = 'http://localhost:9999/spettacolo'; // URL del controller Spring

  constructor(private http: HttpClient) {}

  // Metodo per ottenere spettacoli per una data specifica
  getByDate(date: string): Observable<SpettacoloDto[]> {
    const url = `${this.apiUrl}/byDate`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Parametri della richiesta
    const params = new HttpParams().set('date', date);

    // Richiesta POST al server
    return this.http.post<SpettacoloDto[]>(url, {}, { headers, params });
  }
}
