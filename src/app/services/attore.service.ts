import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttoreDto } from '../model/film';

@Injectable({
  providedIn: 'root'
})


export class AttoreService {
  private apiUrl = 'http://localhost:9999/attore'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getSuggestions(term: string): Observable<AttoreDto[]> {
    return this.http.get<AttoreDto[]>(`${this.apiUrl}?query=${term}`)
  }
  // Metodo per aggiungere un nuovo attore
  nuovo(attoreDto: AttoreDto): Observable<AttoreDto> {
    return this.http.post<AttoreDto>(`${this.apiUrl}/nuovo`, attoreDto);
  }

  // Metodo per eliminare un attore
  elimina(attoreDto: AttoreDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, attoreDto);
  }
}
