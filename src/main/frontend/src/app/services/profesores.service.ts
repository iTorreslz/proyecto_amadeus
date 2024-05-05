import {Injectable} from '@angular/core';
import {Profesor} from '../interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  url = 'http://localhost:8082/admin/profesores';

  async getAllProfesores(): Promise<Profesor[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  /* async getEmpresaById(id: number): Promise<Alumno | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  } */
}
