import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }

  brew(cup_size: any, grain: any, delay: any): Observable<any> {
    let body = new HttpParams({
      fromObject : {
        'cup_size' : cup_size,
        'grain' : grain,
        'delay' : delay
      }
    })
    return this.http.post(`${baseUrl}/brew`, body);
  }

  fill(water: any, beans: any): Observable<any> {
    let body = new HttpParams({
      fromObject : {
        'water' : water,
        'beans' : beans
      }
    })
    return this.http.post(`${baseUrl}/fill`, body);
  }

  levels(): Observable<any> {
    return this.http.get(`${baseUrl}/level`);
  }
}
