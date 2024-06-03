import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audicion } from '../interfaces/audicion';
import { NewAudicion } from '../interfaces/newAudicion';

@Injectable({
  providedIn: HttpClientModule
})
export class AudicionesService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Audicion[]>('http://localhost:8082/audiciones'); }

  getById(id: number) { return this.http.get<Audicion>(`http://localhost:8082/audiciones/${id}`); }

  create(audicion: NewAudicion): Observable<any> { return this.http.post<any>(`http://localhost:8082/audiciones/nuevo`, audicion); }

  update(audicion: NewAudicion, id: number) { return this.http.post<any>(`http://localhost:8082/audiciones/edit/${id}`, audicion); }

  delete(id: number) { return this.http.delete<any>(`http://localhost:8082/audiciones/${id}`); }

}
