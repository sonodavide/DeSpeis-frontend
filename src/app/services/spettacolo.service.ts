import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpettacoloDto } from '../model/spettacolo';
import { FilmSpettacoliDto } from '../model/filmSpettacoli';
import { PostiSpettacoloResponseDto } from '../model/postiSpettacolo';
import { NuovoSpettacoloDto } from '../model/nuovoSpettacolo';
import { SpettacoloRicercaDto } from '../model/spettacoloRicercaDto';
import { PaginatedResponse } from '../model/paginatedResponse';

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
  getPostiSpettacolo(spettacoloId: number): Observable<PostiSpettacoloResponseDto> {
    const params = new HttpParams().set('spettacoloId', spettacoloId);
    return this.http.get<PostiSpettacoloResponseDto>(`${this.apiUrl}/postiSpettacolo`, { params });
  }
  // Metodo per aggiungere un nuovo spettacolo
  nuovo(nuovoSpettacolo: NuovoSpettacoloDto): Observable<NuovoSpettacoloDto> {
    const url = `${this.apiUrl}/nuovo`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<NuovoSpettacoloDto>(url, nuovoSpettacolo, { headers });
  }

  // Metodo per eliminare uno spettacolo esistente
  elimina(spettacolo: NuovoSpettacoloDto): Observable<any> {
    const url = `${this.apiUrl}/elimina`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(url, spettacolo, { headers });
  }
  cerca(date: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<NuovoSpettacoloDto>> {

    const params = new HttpParams()
    .set('date', date)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize);
    return this.http.get<PaginatedResponse<NuovoSpettacoloDto>>(`${this.apiUrl}/cerca`, { params });
  }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<NuovoSpettacoloDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<NuovoSpettacoloDto>>(`${this.apiUrl}/paged`, {params})
  }

  getById(id : number): Observable<SpettacoloDto> {
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<SpettacoloDto>(`${this.apiUrl}/getById`, {params})
  }

  getByIdAcquistabile(id : number): Observable<SpettacoloDto> {
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<SpettacoloDto>(`${this.apiUrl}/getByIdAcquistabile`, {params})
  }
}
