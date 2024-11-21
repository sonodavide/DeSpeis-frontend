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

  getOrdiniByUserPaginated(userId: string, pageNumber: number, pageSize:number): Observable<PaginatedResponse<OrdineDto>> {
    let params = new HttpParams().set('pageNumber', pageNumber).set('userId', userId).set('pageSize', pageSize);

    return this.http.get<PaginatedResponse<OrdineDto>>(`${this.apiUrl}/paged/user`, { params });
  }


}
