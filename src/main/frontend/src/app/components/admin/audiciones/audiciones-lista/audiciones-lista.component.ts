import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Audicion } from '../../../../interfaces/audicion';
import { AudicionesService } from '../../../../services/audiciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audiciones-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
            Instrumento
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Día y Hora
        </th>
        <th class="border-b-2 border-gray-200 bg-blue-100">
          <button class="" [routerLink]="['/admin/audiciones/nuevo']">
            <i class="fa-regular fa-square-plus text-3xl"></i>
          </button>
        </th>
      </tr>
    </thead>
    <tbody *ngFor="let audicion of audicionesList">
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ audicion.id }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ getInstrumento(audicion.idInstrumento) }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ formatDate(audicion.diaHora) }}
        </td>
        <td class="border-b border-gray-200 bg-white text-blue-900 text-center">
          <button class="mr-3 hidden">
              <i class="fa-solid fa-eye"></i>
          </button>
          <button [routerLink]="['/admin/audiciones/editar', audicion.id]" class="mr-3">
              <i class="fa-solid fa-pencil-alt"></i>
          </button>
          <button (click)="deleteAudicion(audicion.id, audicion)">
              <i class="fa-solid fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styleUrl: './audiciones-lista.component.css'
})
export class AudicionesListaComponent {

  audicionesList: Audicion[] = [];

  constructor(private audicionesService: AudicionesService) { }

  ngOnInit() {
    this.audicionesService.getAll().subscribe({
      next: (audiciones: Audicion[]) => {
        this.audicionesList = audiciones;
      },
      error: (error) => {
        console.error('Error al obtener la lista de audiciones:', error);
      }
    });
  }

  formatDate(date: string): string {
    return date.replace("T"," ");
  }

  deleteAudicion(id: number, audicion: Audicion) {
    Swal.fire({
      title: "¿Está seguro de borrar esta audición de " + this.getInstrumento(audicion!.idInstrumento).toLowerCase() + "?",
      text: "No podrá revertir este cambio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {

      if (result.isConfirmed) {

        this.audicionesService.delete(id).subscribe({
          next: () => { },
          error: () => {
            console.error('Error al eliminar el audición con código ' + id);
          }
        });

        Swal.fire({
          title: "¡Hecho!",
          text: "La audición ha sido borrada correctamente.",
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
