import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/profesor';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NewProfesor } from '../interfaces/newProfesor';

@Injectable({
  providedIn: HttpClientModule
})
export class ProfesoresService {

  constructor(private http: HttpClient) { }
  
  getAll() { return this.http.get<Profesor[]>('http://localhost:8082/profesores'); }

  create(profesor: NewProfesor) { return this.http.post<any>(`http://localhost:8082/profesores/nuevo`, profesor); }

  getById(id: number) { return this.http.get<Profesor>(`http://localhost:8082/profesores/${id}`); }

  update(profesor: Profesor, id: number) { return this.http.post<string>(`http://localhost:8082/profesores/edit/${id}`, profesor); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/profesores/delete/${id}`); }
}
