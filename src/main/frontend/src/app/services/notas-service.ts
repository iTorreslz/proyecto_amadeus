import { Injectable } from '@angular/core';
import { Nota } from '../interfaces/Nota';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewNota } from '../interfaces/NewNota';

@Injectable({
  providedIn: HttpClientModule
})
export class NotasService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Nota[]>('http://localhost:8082/notas'); }

  getById(id: number) { return this.http.get<Nota>(`http://localhost:8082/notas/${id}`); }

  create(nota: NewNota) { return this.http.post<any>(`http://localhost:8082/notas/nuevo`, nota); }

  update(nota: NewNota, id: number) { return this.http.post<any>(`http://localhost:8082/notas/edit/${id}`, nota); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/notas/${id}`); }
}
