import {Injectable} from '@angular/core';
import {Audicion} from '../interfaces/audicion';

@Injectable({
  providedIn: 'root'
})
export class AudicionesService {

  url = 'http://localhost:8082/admin/audiciones';

  async getAllAudiciones(): Promise<Audicion[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}
