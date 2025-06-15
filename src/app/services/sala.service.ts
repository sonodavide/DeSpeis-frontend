import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SalaDto } from '../model/salaDto';
import { PaginatedResponse } from '../model/paginatedResponse';
import { Observable } from 'rxjs';
import { SalaConPosti } from '../model/salaConPostiPerFila';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/sala`; 
  }

  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<SalaDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<SalaDto>>(`${this.endpoint}/paged`, {params})
  }

  getPostiPerFila(salaId : number) : Observable<SalaConPosti>{
    const params = new HttpParams()
    .set("salaId", salaId)
    return this.http.get<SalaConPosti>(`${this.endpoint}/postiPerFila`, {params})
  }

  nuovo(sala : SalaConPosti): Observable<SalaConPosti>{
    return this.http.post<SalaConPosti>(`${this.endpoint}/nuovo`, sala)
  }

  modifica(sala : SalaConPosti): Observable<SalaConPosti>{
    return this.http.post<SalaConPosti>(`${this.endpoint}/modifica`, sala)
  }
  elimina(sala : SalaDto): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.endpoint}/elimina`, sala, {headers})
  }

}
