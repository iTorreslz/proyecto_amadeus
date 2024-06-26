import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import { TareaService } from '../../../../services/tareas.service';
import { Tarea } from '../../../../interfaces/tarea';
import { Profesor } from '../../../../interfaces/profesor';
import { MatDialog } from '@angular/material/dialog';
import { DescripcionTareasComponent } from '../descripcion-tareas/descripcion-tareas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="flex flex-col gap-4 max-w-6xl m-auto">
    <div class="flex flex-col gap-2 items-center justify-center text-xl h-64" *ngIf="tareas.length == 0">
      <p>Ninguna tarea asignada aún.</p>
      <a [routerLink]="['/perfil_profesor']" class="mr-3 bg-blue-300 hover:bg-blue-400 transition-colors duration-700 p-2 rounded-xl">Volver</a>
    </div>
    <table class="mt-4 m-auto w-full" *ngIf="tareas.length > 0">
      <thead>
        <tr class="uppercase">
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Código
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Título
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Fecha publicación
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Fecha entrega
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Alumno
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Descripción
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100">
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100">
          </th>
        </tr>
      </thead>
      <tbody *ngFor="let tarea of tareas">
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ tarea.id }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ tarea.titulo }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ formatDate(tarea.fechaPublicacion) }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ formatDate(tarea.fechaEntrega) }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ alumno!.nombre }} {{ alumno!.apellidos }}
          </td>
          <td (click)="openDescripcion(tarea.descripcion)" class="cursor-pointer px-5 py-5 font-bold border-b border-gray-200 bg-white text-blue-700">
            Ver descripcion
          </td>
          <td class="px-5 py-5 font-bold border-b border-gray-200 bg-white text-blue-900"
            [ngClass]="{ 'completada': tarea.completada, 'pendiente': !tarea.completada }">
            {{ checkTarea(tarea.completada) }}
          </td>
          <td class="border-b border-gray-200 bg-white text-blue-900 text-center">
            <button class="mr-3">
              <i [routerLink]="['editar', tarea.id]" class="fa-solid fa-pencil-alt"></i>
            </button>
            <button>
              <i (click)="deleteTarea(tarea.id)" class="fa-solid fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styleUrl: './ver-tareas.component.css'
})
export class VerTareasComponent {

  alumno: Alumno | undefined;
  profesor: Profesor | undefined;
  tareas: Tarea[] = [];

  constructor(
    private route: ActivatedRoute, private alumnosService: AlumnosService, private tareasService: TareaService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let idAlumno = parseInt(this.route.snapshot.params['idAlumno']);

    this.alumnosService.getById(idAlumno).subscribe({
      next: (alumno: Alumno) => {
        this.alumno = alumno;
        this.tareasService.getAll().subscribe({
          next: (tareas: Tarea[]) => {
            tareas.forEach(tarea => {
              if (tarea.idAlumno === this.alumno!.id) {
                this.tareas.push(tarea);
              }
            });
          },
          error: (error) => {
            console.error('Error al obtener la lista de tareas:', error);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  formatDate(date: string): string {
    return date.replace("T", " ").replaceAll("-", "/").slice(0, -3);
  }

  openDescripcion(descripcion: string) {
    let dialogData = {
      descripcion: descripcion
    }

    this.dialog.open(DescripcionTareasComponent, {
      width: '960px',
      height: 'fit-content',
      data: dialogData
    });
  }

  checkTarea(completada: boolean): string {
    if (completada) {
      return "Completada";
    }
    return "Pendiente";
  }

  deleteTarea(id: number) {
    Swal.fire({
      title: "¿Está seguro de eliminar la tarea con código número " + id + "?",
      text: "No podrá revertir este cambio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {

      if (result.isConfirmed) {
        this.tareasService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Hecho!",
              text: "Esta tarea ha sido eliminada.",
              showConfirmButton: false,
              timer: 1700,
              icon: "success"
            }).then(() => {
              window.location.reload();
            });
          },
          error: () => {
            console.error('Error al eliminar la tarea con código ' + id);
          }
        });
      }
    });
  }
}
