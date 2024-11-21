import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
private apiUrl = 'http://localhost:9999/test';

  constructor(private http: HttpClient) {}

  test() : Observable<string>{
    return this.http.get<string>(this.apiUrl)
  }
}
