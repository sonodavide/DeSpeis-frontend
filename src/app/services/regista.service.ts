import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistaDto } from '../model/film';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistaService {

  private apiUrl = 'http://localhost:9999/regista'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getSuggestions(term: string): Observable<RegistaDto[]> {
    return this.http.get<RegistaDto[]>(`${this.apiUrl}?query=${term}`)
  }
  // Metodo per aggiungere un nuovo regista
  nuovo(registaDto: RegistaDto): Observable<RegistaDto> {
    return this.http.post<RegistaDto>(`${this.apiUrl}/nuovo`, registaDto);
  }

  // Metodo per eliminare un regista
  elimina(registaDto: RegistaDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, registaDto);
  }
}
