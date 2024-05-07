import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/profesor';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpClientModule
})
export class ProfesoresService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> { return this.http.get<Profesor[]>('http://localhost:8082/admin/profesores'); }
}
