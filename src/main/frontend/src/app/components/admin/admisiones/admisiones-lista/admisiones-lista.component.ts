import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Admision} from '../../../../interfaces/admision';
import {AdmisionesService} from '../../../../services/admisiones.service';

@Component({
  selector: 'app-admisiones-lista',
  standalone: true,
  imports: [CommonModule],
  template: `
  <table class="m-auto w-full">
    <thead>
      <tr class="uppercase">
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Código
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Código Alumno
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Alumno
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Instrumento
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Decisión
        </th>
        <th
            class="border-b-2 border-gray-200 bg-blue-100">
        </th>
      </tr>
    </thead>
    <tbody *ngFor="let admision of admisionesList">
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.idAdmision }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.alumno.id }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.alumno.nombre + ' ' + admision.alumno.apellidos }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.instrumento }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.decision == null ? 'Decisión no tomada' : (admision.decision ? 'Admitido' : 'No admitido') }}
        </td>
        <td class="border-b border-gray-200 bg-white text-blue-900 text-center">
          <button class="mr-3">
              <i class="fa-solid fa-eye"></i>
          </button>
          <button class="mr-3">
              <i class="fa-solid fa-pencil-alt"></i>
          </button>
          <button>
              <i class="fa-solid fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styleUrl: './admisiones-lista.component.css'
})
export class AdmisionesListaComponent {
  admisionesList: Admision[] = [];
  admisionesService: AdmisionesService = inject(AdmisionesService);

  constructor() {
    this.admisionesService.getAllAdmisiones().then((admisionesList: Admision[]) => {
      this.admisionesList = admisionesList;
    });
  }
}
