import {Injectable} from '@angular/core';
import {Admision} from '../interfaces/admision';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewAdmision } from '../interfaces/newAdmision';

@Injectable({
  providedIn: HttpClientModule
})
export class AdmisionesService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Admision[]>('http://localhost:8082/admisiones'); }

  getById(id: number) { return this.http.get<Admision>(`http://localhost:8082/admisiones/${id}`); }

  create(admision: NewAdmision) { return this.http.post<any>(`http://localhost:8082/admisiones/nuevo`, admision); }

  update(admision: Admision, id: number) { return this.http.post<any>(`http://localhost:8082/admisiones/edit/${id}`, admision); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/admisiones/delete/${id}`); }
}
