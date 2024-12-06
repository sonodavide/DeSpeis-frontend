// utente.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/utente`; 
  }


  getUtente(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.endpoint}`);
  }


  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.endpoint}/all`);
  }


  getByUserId(userId: string): Observable<UserProfile> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<UserProfile>(`${this.endpoint}/userId`, { params });
  }


  getAllPaged(pageNumber: number, pageSize: number): Observable<PaginatedResponse<UserProfile>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<UserProfile>>(`${this.endpoint}/paged`, { params });
  }


  cerca(query: string, pageNumber: number, pageSize: number): Observable<PaginatedResponse<UserProfile>> {
    const params = new HttpParams()
      .set('query', query)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<UserProfile>>(`${this.endpoint}/cerca`, { params });
  }


  count(): Observable<number> {
    return this.http.get<number>(`${this.endpoint}/count`);
  }
  updateUser() : Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update`, {})
  }
}
