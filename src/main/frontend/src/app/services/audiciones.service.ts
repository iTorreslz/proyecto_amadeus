import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audicion } from '../interfaces/audicion';

@Injectable({
  providedIn: HttpClientModule
})
export class AudicionesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> { return this.http.get<Audicion[]>('http://localhost:8082/admin/audiciones'); }
}
