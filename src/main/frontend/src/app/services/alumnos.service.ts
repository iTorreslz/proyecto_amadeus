import {Injectable} from '@angular/core';
import {Alumno} from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  url = 'http://localhost:8082/admin/alumnos';

  async getAllAlumnos(): Promise<Alumno[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  /* async getEmpresaById(id: number): Promise<Alumno | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  } */
}
