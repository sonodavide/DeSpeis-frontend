// utente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtenteDto } from '../model/utenteDto';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:9999/utente';

  constructor(private http: HttpClient) {}

  getUtente(userId: number): Observable<UtenteDto> {
    let params = new HttpParams();
    
    params = params.set('userId', userId.toString());
    
    return this.http.get<UtenteDto>(this.apiUrl, { params });
  }
  getUtenti(): Observable< UtenteDto[]>{
    return this.http.get<UtenteDto[]>(this.apiUrl);
  }

  getSuggestions(term: string): Observable<UtenteDto[]> {
    return this.http.get<UtenteDto[]>(`${this.apiUrl}/cerca?query=${term}`)
  }
  // Metodo per aggiungere un nuovo Utente
  nuovo(utenteDto: UtenteDto): Observable<UtenteDto> {
    return this.http.post<UtenteDto>(`${this.apiUrl}/nuovo`, utenteDto);
  }

  // Metodo per eliminare un Utente
  elimina(utenteDto: UtenteDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, utenteDto);
  }

  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<UtenteDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<UtenteDto>>(`${this.apiUrl}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<UtenteDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<UtenteDto>>(`${this.apiUrl}/cerca`, {params})
  }
}
