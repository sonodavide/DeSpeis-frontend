import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BigliettoDto } from '../model/bigliettoDto';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class BigliettoService {
  private apiUrl = 'http://localhost:9999/biglietto'; // Cambia l'URL base se necessario

  constructor(private http: HttpClient) {}

  // Recupera i biglietti dell'utente autenticato
  getBiglietti(pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}`, { params });
  }

  // Recupera tutti i biglietti (richiede ruolo admin)
  getAllBiglietti(pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/all`, { params });
  }

  // Recupera tutti i biglietti per data (richiede ruolo admin)
  getAllByDate(date: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('date', date)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/allByDate`, { params });
  }

  // Recupera biglietti dell'utente autenticato per data
  getByDate(date: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('date', date)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/date`, { params });
  }

  // Recupera biglietti per userId e data (richiede ruolo admin)
  getByUserIdAndDate(userId: string, date: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('uesrId', userId) // Nota: correzione da "uesrId" a "userId" nel back-end potrebbe essere necessaria
      .set('date', date)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/userIdAndDate`, { params });
  }

  // Recupera biglietti per userId (richiede ruolo admin)
  getByUserId(userId: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/userId`, { params });
  }
}
