import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmDto } from '../model/film';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/film`; 
  }

  getFilms(): Observable<FilmDto[]> {
    return this.http.get<FilmDto[]>(this.endpoint);
  }
  getFilm(id : number): Observable<FilmDto> {
    const params = new HttpParams().set('id',id)
    return this.http.get<FilmDto>(`${this.endpoint}`, {params});
  }


  nuovo(film: FilmDto): Observable<FilmDto> {
    return this.http.post<FilmDto>(`${this.endpoint}/nuovo`, film);
  }

  elimina(film: FilmDto): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/elimina`, film);
  }


  cerca(query: string, pageNumber : number, pageSize : number): Observable<PaginatedResponse<FilmDto>> {
    const params = new HttpParams()
    .set('query', query)
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<FilmDto>>(`${this.endpoint}/cerca`, { params });
  }

  getAllPaginated(pageNumber : number, pageSize : number) : Observable<PaginatedResponse<FilmDto>>{
    const params = new HttpParams()
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    return this.http.get<PaginatedResponse<FilmDto>>(`${this.endpoint}/paged`, {params})
  }

  cercaTag(tag : string, id: number, pageNumber: number){
    const params = new HttpParams()
    .set("tag", tag)
    .set("id", id)
    .set("pageNumber", pageNumber)
    return this.http.get<PaginatedResponse<FilmDto>>(`${this.endpoint}/cercaTag`, {params})
  }
  ultimeUscite() : Observable<FilmDto[]>{
    return this.http.get<FilmDto[]>(`${this.endpoint}/ultimeUscite`)
  }

  esisteInUnoSpettacoloDaProiettare(id : number){
    const params = new HttpParams()
    .set("id", id)
    return this.http.get<boolean>(`${this.endpoint}/esisteInUnoSpettacoloDaProiettare`, {params})
  }
}
