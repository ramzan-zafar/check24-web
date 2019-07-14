import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  getFilmList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/films`);
  }

  getFilmsByName(name: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/films/${name}`);
  }

  rateFilm(rating: Object): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/films/rate`, rating);
  }
}
