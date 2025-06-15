import { Injectable } from '@angular/core';
import { GenereDto } from '../model/film';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenereService {
  private apiUrl = 'http://localhost:9999/genere'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getSuggestions(term: string): Observable<GenereDto[]> {
    return this.http.get<GenereDto[]>(`${this.apiUrl}?query=${term}`)
  }
  // Metodo per aggiungere un nuovo genere
  nuovo(genereDto: GenereDto): Observable<GenereDto> {
    return this.http.post<GenereDto>(`${this.apiUrl}/nuovo`, genereDto);
  }

  // Metodo per eliminare un genere
  elimina(genereDto: GenereDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, genereDto);
  }
}
