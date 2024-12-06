import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RegistaDto } from '../model/film';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
@Injectable({
  providedIn: 'root'
})
export class RegistaService {

  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/regista`; 
  }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<RegistaDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<RegistaDto>>(`${this.endpoint}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<RegistaDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<RegistaDto>>(`${this.endpoint}/cerca`, {params})
  }

  nuovo(registaDto: RegistaDto): Observable<RegistaDto> {
    return this.http.post<RegistaDto>(`${this.endpoint}/nuovo`, registaDto);
  }


  elimina(registaDto: RegistaDto): Observable<string> {
    return this.http.post(`${this.endpoint}/elimina`, registaDto, {responseType:'text'});
  }
  getNomeById(id : number): Observable<string>{
    const params = new HttpParams()
    .set("id", id)
    return this.http.get(`${this.endpoint}/getNomeById`, {params, responseType:'text'})
  }
}
