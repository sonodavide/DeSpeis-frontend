import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BigliettoDto } from '../model/bigliettoDto';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class BigliettoService {
  
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/biglietto`; 
  }

  getBiglietti(pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}`, { params });
  }


  getAllBiglietti(pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/all`, { params });
  }


  getAllByDate(date: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('date', date)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/allByDate`, { params });
  }


  getByDate(date: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('date', date)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/date`, { params });
  }


  getByUserIdAndDate(userId: string, date: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('uesrId', userId) // Nota: correzione da "uesrId" a "userId" nel back-end potrebbe essere necessaria
      .set('date', date)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/userIdAndDate`, { params });
  }


  getByUserId(userId: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<BigliettoDto>> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<BigliettoDto>>(`${this.apiUrl}/userId`, { params });
  }
}
