import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profesorado-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <table class="m-auto w-full">
    <thead>
      <tr class="uppercase">
        <th class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Código
        </th>
        <th class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Nombre
        </th>
        <th class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Apellidos
        </th>
        <th class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Instrumento
        </th>
        <th class="border-b-2 border-gray-200 bg-blue-100">
          <button class="" [routerLink]="['/admin/profesorado/nuevo']">
            <i class="fa-regular fa-square-plus text-3xl"></i>
          </button>
        </th>
      </tr>
    </thead>
    <tbody *ngFor="let profesor of profesoresList">
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ profesor.id }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ profesor.nombre }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ profesor.apellidos }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ this.getInstrumento(profesor.idInstrumento) }}
        </td>
        <td class="border-b border-gray-200 bg-white text-blue-900 text-center">
          <button class="mr-3" [routerLink]="['/admin/profesorado/detalle', profesor.id]">
              <i class="fa-solid fa-eye"></i>
          </button>
          <button class="mr-3" [routerLink]="['/admin/profesorado/editar', profesor.id]">
              <i class="fa-solid fa-pencil-alt"></i>
          </button>
          <button (click)="deleteProfesor(profesor.id)">
              <i class="fa-solid fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styleUrl: './profesorado-lista.component.css'
})
export class ProfesoradoListaComponent {
  profesoresList: Profesor[] = [];

  constructor(private profesoresService: ProfesoresService, private router: Router) { }

  ngOnInit() {
    this.profesoresService.getAll().subscribe({
      next: (profesores: Profesor[]) => {
        this.profesoresList = profesores;
      },
      error: (error) => {
        console.error('Error al obtener la lista de profesores:', error);
      }
    });
  }

  getInstrumento(idInstrumento: number): string {
    switch (idInstrumento) {
      case 1:
        return "Piano";
        break;
      case 2:
        return "Guitarra";
        break;
      case 3:
        return "Clarinete";
        break;
      case 4:
        return "Saxofón";
        break;
      case 5:
        return "Flauta";
        break;
      case 6:
        return "Trompeta";
        break;
      case 7:
        return "Bombardino";
        break;
      case 8:
        return "Tuba";
        break;
      case 9:
        return "Trombón";
        break;
      case 10:
        return "Canto";
        break;
      default:
        return "No asignado";
    }
  }

  deleteProfesor(id: number) {
    this.profesoresService.delete(id).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: () => {
        console.error('Error al eliminar el profesor con código ' + id);
      }
    });
  }
}
