import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';

@Component({
  selector: 'app-alumnado-lista',
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
            Nombre
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Apellidos
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Curso actual
        </th>
        <th
            class="border-b-2 border-gray-200 bg-blue-100">
        </th>
      </tr>
    </thead>
    <tbody *ngFor="let alumno of alumnosList">
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ alumno.id }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ alumno.nombre }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ alumno.apellidos }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ getNombreCurso(alumno.curso) }}
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
  styleUrl: './alumnado-lista.component.css'
})
export class AlumnadoListaComponent {
  alumnosList: Alumno[] = [];
  alumnosService: AlumnosService = inject(AlumnosService);
  nombreCurso: string = '';

  constructor() {
    this.alumnosService.getAllAlumnos().then((alumnosList: Alumno[]) => {
      this.alumnosList = alumnosList;
    });
  }

  getNombreCurso(curso: number): string {
    switch (curso) {
      case 1:
        return 'Primero';
      case 2:
        return 'Segundo';
      case 3:
        return 'Tercero';
      case 4:
        return 'Cuarto';
      default:
        return 'Error';
    }
  }
}