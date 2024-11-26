// utente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:9999/utente';

  constructor(private http: HttpClient) {}

  // Recupera le informazioni dell'utente autenticato
  getUtente(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}`);
  }

  // Recupera tutti gli utenti (richiede ruolo admin)
  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/all`);
  }

  // Recupera informazioni di un utente specifico tramite userId (richiede ruolo admin)
  getByUserId(userId: string): Observable<UserProfile> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<UserProfile>(`${this.apiUrl}/userId`, { params });
  }

  // Recupera utenti in modalità paginata (richiede ruolo admin)
  getAllPaged(pageNumber: number, pageSize: number): Observable<PaginatedResponse<UserProfile>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<UserProfile>>(`${this.apiUrl}/paged`, { params });
  }

  // Effettua una ricerca con query specifica in modalità paginata (richiede ruolo admin)
  cerca(query: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<UserProfile>> {
    const params = new HttpParams()
      .set('query', query)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<UserProfile>>(`${this.apiUrl}/cerca`, { params });
  }

  // Conta il numero totale di utenti (richiede ruolo admin)
  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
  updateUser() : Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/update`, {})
  }
}
