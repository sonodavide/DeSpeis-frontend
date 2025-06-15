import { Injectable } from '@angular/core';
import { GenereDto } from '../model/film';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
@Injectable({
  providedIn: 'root'
})
export class GenereService {
  private apiUrl = 'http://localhost:9999/genere'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<GenereDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<GenereDto>>(`${this.apiUrl}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<GenereDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<GenereDto>>(`${this.apiUrl}/cerca`, {params})
  }
  // Metodo per aggiungere un nuovo genere
  nuovo(genereDto: GenereDto): Observable<GenereDto> {
    return this.http.post<GenereDto>(`${this.apiUrl}/nuovo`, genereDto);
  }

  // Metodo per eliminare un genere
  elimina(genereDto: GenereDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, genereDto);
  }
}
