import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Instrumento } from '../interfaces/instrumento';

@Injectable({
  providedIn: HttpClientModule
})
export class InstrumentosService {

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Instrumento[]>('http://localhost:8082/instrumentos'); }

  getById(id: number) { return this.http.get<Instrumento>(`http://localhost:8082/instrumentos/${id}`); }
}
