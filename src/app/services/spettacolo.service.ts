import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpettacoloDto } from '../model/spettacolo';
import { FilmSpettacoliDto } from '../model/filmSpettacoli';
import { PostiSpettacoloResponseDto } from '../model/postiSpettacoloResponseDto';
import { NuovoSpettacoloDto } from '../model/nuovoSpettacolo';
import { SpettacoloRicercaDto } from '../model/spettacoloRicercaDto';
import { PaginatedResponse } from '../model/paginatedResponse';
import { SpettacoloSenzaFilmTagsDto } from '../model/spettacoloSenzaFilmTags';

@Injectable({
  providedIn: 'root'
})
export class SpettacoloService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/spettacolo`; 
  }

  getByDate(date: string): Observable<FilmSpettacoliDto[]> {
    const url = `${this.endpoint}/byDate`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('date', date);
    return this.http.post<FilmSpettacoliDto[]>(url, {}, { headers, params });
  }
  getPostiSpettacolo(spettacoloId: number): Observable<PostiSpettacoloResponseDto> {
    const params = new HttpParams().set('spettacoloId', spettacoloId);
    return this.http.get<PostiSpettacoloResponseDto>(`${this.endpoint}/postiSpettacolo`, { params });
  }
  getPostiSpettacoloAcquistabile(spettacoloId: number): Observable<PostiSpettacoloResponseDto> {
    const params = new HttpParams().set('spettacoloId', spettacoloId);
    return this.http.get<PostiSpettacoloResponseDto>(`${this.endpoint}/postiSpettacoloAcquistabile`, { params });
  }

  nuovo(nuovoSpettacolo: NuovoSpettacoloDto): Observable<NuovoSpettacoloDto> {
    const url = `${this.endpoint}/nuovo`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<NuovoSpettacoloDto>(url, nuovoSpettacolo, { headers });
  }

  elimina(spettacolo: NuovoSpettacoloDto): Observable<any> {
    const url = `${this.endpoint}/elimina`;
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
    return this.http.get<PaginatedResponse<NuovoSpettacoloDto>>(`${this.endpoint}/cerca`, { params });
  }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<NuovoSpettacoloDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<NuovoSpettacoloDto>>(`${this.endpoint}/paged`, {params})
  }

  getById(id : number): Observable<SpettacoloDto> {
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<SpettacoloDto>(`${this.endpoint}/getById`, {params})
  }

  getByIdAcquistabile(id : number): Observable<SpettacoloDto> {
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<SpettacoloDto>(`${this.endpoint}/getByIdAcquistabile`, {params})
  }

  getSenzaFilmAcquistabileById(id : number): Observable<SpettacoloSenzaFilmTagsDto> {
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<SpettacoloSenzaFilmTagsDto>(`${this.endpoint}/getSenzaFilmAcquistabileById`, {params})
  }

  getSenzaFilmById(id : number): Observable<SpettacoloSenzaFilmTagsDto> {
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<SpettacoloSenzaFilmTagsDto>(`${this.endpoint}/getSenzaFilmById`, {params})
  }

  getAllSenzaFilmTags(pageNumber: number, pageSize: number) : Observable<PaginatedResponse<SpettacoloSenzaFilmTagsDto[]>> {
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<SpettacoloSenzaFilmTagsDto[]>>(`${this.endpoint}/getAllSenzaFilmTags`, {params})
  }

  cercaSenzaFilmTags(date: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<SpettacoloSenzaFilmTagsDto>> {

    const params = new HttpParams()
    .set('date', date)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize);
    return this.http.get<PaginatedResponse<SpettacoloSenzaFilmTagsDto>>(`${this.endpoint}/cercaSenzaFilmTags`, { params });
  }

  getNuovoSpettacoloById(id : number): Observable<NuovoSpettacoloDto>{
    const params = new HttpParams()
    .set("id", id)

    return this.http.get<NuovoSpettacoloDto>(`${this.endpoint}/getNuovoSpettacoloById`, {params})
  }
  getStato(id : number) : Observable<string> {
    const params = new HttpParams()
    .set("id", id)

    return this.http.get(`${this.endpoint}/getStato`, {params, responseType: "text"})
  }
}
