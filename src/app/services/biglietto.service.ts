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

  // Metodo per ottenere tutti i biglietti con paginazione
  getAllBiglietti(page: number = 0): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginatedResponse<BigliettoDto>>(this.apiUrl, { params });
  }

  // Metodo per ottenere i biglietti di un utente specifico con paginazione
  getBigliettiByUser(userId: number, pageNumber: number, pageSize : number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/paged/user`, { params });
  }

  // Metodo per ottenere i biglietti di una data specifica
  getBigliettiByDate(date: string): Observable<BigliettoDto[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<BigliettoDto[]>(this.apiUrl, { params });
  }

  // Metodo per ottenere i biglietti di un utente specifico e di una data specifica
  getBigliettiByUserAndDate(userId: number, date: string): Observable<BigliettoDto[]> {
    const params = new HttpParams()
      .set('user', userId.toString())
      .set('date', date);
    return this.http.get<BigliettoDto[]>(this.apiUrl, { params });
  }

  // Metodo per ottenere biglietti di un utente specifico e di una data specifica con paginazione
  getBigliettiFiltered(userId?: number, date?: string, page: number = 0): Observable<BigliettoDto[]> {
    let params = new HttpParams().set('page', page.toString());
    
    if (userId !== undefined) {
      params = params.set('user', userId.toString());
    }
    
    if (date) {
      params = params.set('date', date);
    }

    return this.http.get<BigliettoDto[]>(this.apiUrl, { params });
  }
}
