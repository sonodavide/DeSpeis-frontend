import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaDto } from '../model/salaDto';
import { PaginatedResponse } from '../model/paginatedResponse';
import { Observable } from 'rxjs';
import { SalaConPosti } from '../model/salaConPostiPerFila';

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

  getPostiPerFila(salaId : number) : Observable<SalaConPosti>{
    const params = new HttpParams()
    .set("salaId", salaId)
    return this.http.get<SalaConPosti>(`${this.apiUrl}/postiPerFila`, {params})
  }

  nuovo(sala : SalaConPosti): Observable<SalaConPosti>{
    return this.http.post<SalaConPosti>(`${this.apiUrl}/nuovo`, sala)
  }

  elimina(sala : SalaDto): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/elimina`, sala, {headers})
  }
}
