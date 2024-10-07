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

  // Metodo per ottenere gli ordini con paginazione (pagina di default 0)
  getOrdiniPaginated(page: number, userId?: number): Observable<PaginatedResponse<OrdineDto>> {
    let params = new HttpParams().set('page', page.toString());
    if (userId !== undefined) {
      params = params.set('user', userId.toString());
    }
    
    return this.http.get<PaginatedResponse<OrdineDto>>(this.apiUrl, { params });
  }


}
