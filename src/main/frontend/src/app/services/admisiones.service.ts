import { Injectable } from '@angular/core';
import { Admision } from '../interfaces/admision';

@Injectable({
  providedIn: 'root'
})
export class AdmisionesService {

  url = 'http://localhost:8082/admin/admisiones';

  async getAllAdmisiones(): Promise<Admision[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}
