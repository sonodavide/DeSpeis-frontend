import { Inject, Injectable } from '@angular/core';
import { GenereDto } from '../model/film';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
@Injectable({
  providedIn: 'root'
})
export class GenereService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/genere`; 
  }
  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<GenereDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<GenereDto>>(`${this.endpoint}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<GenereDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<GenereDto>>(`${this.endpoint}/cerca`, {params})
  }

  nuovo(genereDto: GenereDto): Observable<GenereDto> {
    return this.http.post<GenereDto>(`${this.endpoint}/nuovo`, genereDto);
  }


  elimina(genereDto: GenereDto): Observable<string> {
    return this.http.post(`${this.endpoint}/elimina`, genereDto, {responseType:'text'});
  }
  getNomeById(id : number): Observable<string>{
    const params = new HttpParams()
    .set("id", id)
    return this.http.get(`${this.endpoint}/getNomeById`, {params, responseType:'text'})
  }
}
