import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewTarea } from '../interfaces/newTarea';

@Injectable({
  providedIn: HttpClientModule
})
export class TareaService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Tarea[]>('http://localhost:8082/tareas'); }

  getById(id: number) { return this.http.get<Tarea>(`http://localhost:8082/tareas/${id}`); }

  create(tarea: NewTarea) { return this.http.post<any>(`http://localhost:8082/tareas/nuevo`, tarea); }

  update(tarea: Tarea, id: number) { return this.http.post<any>(`http://localhost:8082/tareas/edit/${id}`, tarea); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/tareas/${id}`); }
}
