import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumeriUtiliService {
  private endpoint = ``; 
  constructor(@Inject('API_URL') private readonly apiUrl: string, private http: HttpClient) {
    this.endpoint = `${this.apiUrl}/`; 
  }

  getNumeroFilms() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}film/count`)
  }

  getNumeroGeneri() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}genere/count`)
  }
  getNumeroAttori() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}attore/count`)
  }

  getNumeroBiglietti() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}biglietto/count`)
  }

  getNumeroRegisti() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}regista/count`)
  }

  getNumeroSpettacoli() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}spettacolo/count`)
  }

  getNumeroUtenti() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}film/count`)
  }

  getNumeroOrdini() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}ordine/count`)
  }

  getNumeroSale() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}sala/count`)
  }
  getIncassiTotali() : Observable<number>{
    return this.http.get<number>(`${this.endpoint}ordine/incassiTotali`)
  }
}
