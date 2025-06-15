import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmDto } from '../model/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = 'http://localhost:9999/film'; // Modifica l'URL se necessario

  constructor(private http: HttpClient) { }

  // Ottieni tutti i film
  getFilms(): Observable<FilmDto[]> {
    return this.http.get<FilmDto[]>(this.apiUrl);
  }
  getFilm(id : number): Observable<FilmDto> {
    const params = new HttpParams().set('id',id)
    return this.http.get<FilmDto>(`${this.apiUrl}`, {params});
  }
}
