// ordine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdineDto } from '../model/ordineDto';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {
  private apiUrl = 'http://localhost:9999/ordine';

  constructor(private http: HttpClient) {}

   // Recupera gli ordini dell'utente autenticato
   getOrdini(pageNumber: number, pageSize: number): Observable<PaginatedResponse<OrdineDto>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<OrdineDto>>(`${this.apiUrl}`, { params });
  }

  // Recupera gli ordini di uno specifico utente in modalità paginata (richiede ruolo admin)
  getAllByUserIdPaged(userId: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<OrdineDto>> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<OrdineDto>>(`${this.apiUrl}/paged/user`, { params });
  }



}
