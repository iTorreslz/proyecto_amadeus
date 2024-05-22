import { Injectable } from '@angular/core';
import { Alumno } from '../interfaces/alumno';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: HttpClientModule
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Alumno[]>('http://localhost:8082/alumnos'); }

  getById(id: number) { return this.http.get<Alumno>(`http://localhost:8082/alumnos/${id}`); }

  update(alumno: Alumno, id: number) { return this.http.post<string>(`http://localhost:8082/alumnos/edit/${id}`, alumno); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/alumnos/delete/${id}`); }
}
