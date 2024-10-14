import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistaDto } from '../model/film';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
@Injectable({
  providedIn: 'root'
})
export class RegistaService {

  private apiUrl = 'http://localhost:9999/regista'; // Cambia l'URL base se necessario
  constructor(private http: HttpClient) { }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<RegistaDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<RegistaDto>>(`${this.apiUrl}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<RegistaDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<RegistaDto>>(`${this.apiUrl}/cerca`, {params})
  }
  // Metodo per aggiungere un nuovo regista
  nuovo(registaDto: RegistaDto): Observable<RegistaDto> {
    return this.http.post<RegistaDto>(`${this.apiUrl}/nuovo`, registaDto);
  }

  // Metodo per eliminare un regista
  elimina(registaDto: RegistaDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/elimina`, registaDto);
  }
}
