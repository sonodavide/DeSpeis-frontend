import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttoreDto } from '../model/film';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})


export class AttoreService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) { 
    this.endpoint = `${this.apiUrl}/attore`; 
  }
  getSuggestions(term: string): Observable<AttoreDto[]> {
    return this.http.get<AttoreDto[]>(`${this.endpoint}/cerca?query=${term}`)
  }

  nuovo(attoreDto: AttoreDto): Observable<AttoreDto> {
    return this.http.post<AttoreDto>(`${this.endpoint}/nuovo`, attoreDto);
  }


  elimina(attoreDto: AttoreDto): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/elimina`, attoreDto);
  }

  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<AttoreDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<AttoreDto>>(`${this.endpoint}/paged`, {params})
  }
  cerca(term: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<AttoreDto>> {
    const params = new HttpParams()
    .set("query", term)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<AttoreDto>>(`${this.endpoint}/cerca`, {params})
  }

  getAll() : Observable<AttoreDto[]>{
    return this.http.get<AttoreDto[]>(`${this.endpoint}`)
  }

  getNomeById(id : number): Observable<string>{
    const params = new HttpParams()
    .set("id", id)
    return this.http.get(`${this.endpoint}/getNomeById`, {params, responseType:'text'})
  }
}
