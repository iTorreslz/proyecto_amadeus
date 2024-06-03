import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
          <button (click)="deleteProfesor(profesor.id, profesor)">
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

  deleteProfesor(id: number, profesor: Profesor) {
    Swal.fire({
      title: "¿Está seguro de borrar al profesor " + profesor.nombre + " " + profesor.apellidos + "?",
      text: "No podrá revertir este cambio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {

      if (result.isConfirmed) {

        this.profesoresService.delete(id).subscribe({
          next: () => { },
          error: () => {
            console.error('Error al eliminar el profesor con código ' + id);
          }
        });

        Swal.fire({
          title: "¡Hecho!",
          text: "El profesor ya no pertenece a la escuela.",
          showConfirmButton: false,
          timer: 1700,
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  getInstrumento(idInstrumento: number): string {
    switch (idInstrumento) {
      case 1:
        return "Piano";
      case 2:
        return "Guitarra";
      case 3:
        return "Clarinete";
      case 4:
        return "Saxofón";
      case 5:
        return "Flauta";
      case 6:
        return "Trompeta";
      case 7:
        return "Bombardino";
      case 8:
        return "Tuba";
      case 9:
        return "Trombón";
      case 10:
        return "Canto";
      default:
        return "No asignado";
    }
  }
}
