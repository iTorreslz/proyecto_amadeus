import { Injectable } from '@angular/core';
import { Alumno } from '../interfaces/alumno';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpClientModule
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Alumno[]>('http://localhost:8082/alumnos'); }

  delete(id: number): Observable<string> { return this.http.delete<any>(`http://localhost:8082/alumnos/delete/${id}`); }
}
