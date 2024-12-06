import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmDto } from '../model/film';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = 'http://localhost:9999/film'; // Modifica l'URL se necessario

  constructor(private http: HttpClient) { }

  getFilms(): Observable<FilmDto[]> {
    return this.http.get<FilmDto[]>(this.apiUrl);
  }
  getFilm(id : number): Observable<FilmDto> {
    const params = new HttpParams().set('id',id)
    return this.http.get<FilmDto>(`${this.apiUrl}`, {params});
  }

  // Metodo per creare un nuovo film
  nuovo(film: FilmDto): Observable<FilmDto> {
    return this.http.post<FilmDto>(`${this.apiUrl}/nuovo`, film);
  }

  // Metodo per eliminare un film
  elimina(film: FilmDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/elimina`, film);
  }

  // Metodo per suggerire film basato su un termine di ricerca
  cerca(query: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<FilmDto>> {
    const params = new HttpParams()
    .set('query', query)
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<FilmDto>>(`${this.apiUrl}/cerca`, { params });
  }

  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<FilmDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<FilmDto>>(`${this.apiUrl}/paged`, {params})
  }

  cercaTag(tag : string, id: number, pageNumber: number){
    const params = new HttpParams()
    .set("tag", tag)
    .set("id", id)
    .set("pageNumber", pageNumber)
    return this.http.get<PaginatedResponse<FilmDto>>(`${this.apiUrl}/cercaTag`, {params})
  }
  ultimeUscite() : Observable<FilmDto[]>{
    return this.http.get<FilmDto[]>(`${this.apiUrl}/ultimeUscite`)
  }

  esisteInUnoSpettacoloDaProiettare(id : number){
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<boolean>(`${this.apiUrl}/esisteInUnoSpettacoloDaProiettare`, {params})
  }
}
