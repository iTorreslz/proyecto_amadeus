import { Injectable } from '@angular/core';
import { Clase } from '../interfaces/clase';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewClase } from '../interfaces/newClase';

@Injectable({
  providedIn: HttpClientModule
})
export class ClasesService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Clase[]>('http://localhost:8082/clases'); }

  getById(id: number) { return this.http.get<Clase>(`http://localhost:8082/clases/${id}`); }

  create(clase: NewClase) { return this.http.post<any>(`http://localhost:8082/clases/nuevo`, clase); }

  update(clase: Clase, id: number) { return this.http.post<any>(`http://localhost:8082/clases/edit/${id}`, clase); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/clases/${id}`); }
}
