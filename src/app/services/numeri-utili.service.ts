import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumeriUtiliService {
  private apiUrl = 'http://localhost:9999/'; 
  constructor(private http: HttpClient) { }

  getNumeroFilms() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}film/count`)
  }

  getNumeroGeneri() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}genere/count`)
  }
  getNumeroAttori() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}attore/count`)
  }

  getNumeroBiglietti() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}biglietto/count`)
  }

  getNumeroRegisti() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}regista/count`)
  }

  getNumeroSpettacoli() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}spettacolo/count`)
  }

  getNumeroUtenti() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}film/count`)
  }

  getNumeroOrdini() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}ordine/count`)
  }

  getNumeroSale() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}sala/count`)
  }
  getIncassiTotali() : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}ordine/incassiTotali`)
  }
}
