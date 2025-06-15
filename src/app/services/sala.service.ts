import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaDto } from '../model/salaDto';
import { PaginatedResponse } from '../model/paginatedResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private apiUrl = 'http://localhost:9999/sala'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<SalaDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<SalaDto>>(`${this.apiUrl}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<SalaDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<SalaDto>>(`${this.apiUrl}/cerca`, {params})
  }
}
