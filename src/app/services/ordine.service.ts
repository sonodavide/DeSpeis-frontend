// ordine.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdineDto } from '../model/ordineDto';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/ordine`; 
  }


   getOrdini(pageNumber: number, pageSize: number): Observable<PaginatedResponse<OrdineDto>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<OrdineDto>>(`${this.endpoint}`, { params });
  }


  getAllByUserIdPaged(userId: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<OrdineDto>> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<OrdineDto>>(`${this.endpoint}/paged/user`, { params });
  }



}
