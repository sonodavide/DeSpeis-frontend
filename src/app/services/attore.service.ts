import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttoreDto } from '../model/film';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})


export class AttoreService {
  private apiUrl = 'http://localhost:9999/attore'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getSuggestions(term: string): Observable<AttoreDto[]> {
    return this.http.get<AttoreDto[]>(`${this.apiUrl}/cerca?query=${term}`)
  }
  // Metodo per aggiungere un nuovo attore
  nuovo(attoreDto: AttoreDto): Observable<AttoreDto> {
    return this.http.post<AttoreDto>(`${this.apiUrl}/nuovo`, attoreDto);
  }

  // Metodo per eliminare un attore
  elimina(attoreDto: AttoreDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, attoreDto);
  }

  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<AttoreDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<AttoreDto>>(`${this.apiUrl}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<AttoreDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<AttoreDto>>(`${this.apiUrl}/cerca`, {params})
  }

  getAll() : Observable<AttoreDto[]>{
    return this.http.get<AttoreDto[]>(`${this.apiUrl}`)
  }

  getNomeById(id : number): Observable<string>{
    const params = new HttpParams()
    .set("id", id)
    return this.http.get(`${this.apiUrl}/getNomeById`, {params, responseType:'text'})
  }
}
