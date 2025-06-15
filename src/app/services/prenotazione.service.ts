import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PrenotazioneRequestDto } from '../model/prenotazioneRequest';
import { PostiSpettacoloResponseDto } from '../model/postiSpettacoloResponseDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/prenotazione`; 
  }

  prenota(prenotazioneRequest: PrenotazioneRequestDto): Observable<PostiSpettacoloResponseDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PostiSpettacoloResponseDto>(`${this.endpoint}/prenota`, prenotazioneRequest, { headers });
  }

  blocca(prenotazioneRequest: PrenotazioneRequestDto): Observable<PostiSpettacoloResponseDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PostiSpettacoloResponseDto>(`${this.endpoint}/blocca`, prenotazioneRequest, { headers });
  }
  
}
