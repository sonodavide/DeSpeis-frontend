import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpettacoloDto } from '../model/spettacolo';
import { FilmSpettacoliDto } from '../model/filmSpettacoli';
import { PostispettacoloDto } from '../model/postiSpettacolo';

@Injectable({
  providedIn: 'root'
})
export class SpettacoloService {
  private apiUrl = 'http://localhost:9999/spettacolo'; 

  constructor(private http: HttpClient) {}

  getByDate(date: string): Observable<FilmSpettacoliDto[]> {
    const url = `${this.apiUrl}/byDate`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('date', date);
    return this.http.post<FilmSpettacoliDto[]>(url, {}, { headers, params });
  }
  getPostiSpettacolo(spettacoloId: number): Observable<PostispettacoloDto> {
    const params = new HttpParams().set('spettacoloId', spettacoloId);
    return this.http.get<PostispettacoloDto>(`${this.apiUrl}/sala`, { params });
  }
}
