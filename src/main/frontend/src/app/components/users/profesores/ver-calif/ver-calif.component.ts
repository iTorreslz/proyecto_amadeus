import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Alumno } from '../../../../interfaces/alumno';
import { Profesor } from '../../../../interfaces/profesor';
import { Nota } from '../../../../interfaces/Nota';
import { NotasService } from '../../../../services/notas-service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlumnosService } from '../../../../services/alumnos.service';
import { ProfesoresService } from '../../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-calif',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="max-w-6xl m-auto">
    <div class="flex items-center justify-center text-xl h-64" *ngIf="notas.length == 0">
      <p>Ninguna nota asignada aún.</p>
    </div>
    <table class="mt-4 m-auto w-full" *ngIf="notas.length > 0">
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
              Calificación
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Alumno
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100">
          </th>
        </tr>
      </thead>
      <tbody *ngFor="let nota of notas">
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ nota.id }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ nota.nombre }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ nota.calificacion }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ alumno!.nombre }} {{ alumno!.apellidos }}
          </td>
          <td class="border-b border-gray-200 bg-white text-blue-900 text-center">
            <button class="mr-3">
              <i [routerLink]="['editar', nota.id]" class="fa-solid fa-pencil-alt"></i>
            </button>
            <button>
              <i (click)="deleteNota(nota.id)" class="fa-solid fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styleUrl: './ver-calif.component.css'
})
export class VerCalifComponent {

  alumno: Alumno | undefined;
  profesor: Profesor | undefined;
  notas: Nota[] = [];

  constructor(
    private route: ActivatedRoute, private alumnosService: AlumnosService,
    private notasService: NotasService, private profesorService: ProfesoresService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let idAlumno = parseInt(this.route.snapshot.params['idAlumno']);
    let idProfesor = parseInt(this.route.snapshot.params['idProfesor']);

    this.alumnosService.getById(idAlumno).subscribe({
      next: (alumno: Alumno) => {
        this.alumno = alumno;

        this.profesorService.getById(idProfesor).subscribe({
          next: (profesor: Profesor) => {
            this.profesor = profesor;

            this.notasService.getAll().subscribe({
              next: (notas: Nota[]) => {
                this.notas = notas;
              }
            });
          }
        });
      }
    });
  }

  deleteNota(id: number) {
    Swal.fire({
      title: "¿Está seguro de eliminar la nota con código número " + id + "?",
      text: "No podrá revertir este cambio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {

      if (result.isConfirmed) {
        this.notasService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Hecho!",
              text: "Esta nota ha sido eliminada.",
              showConfirmButton: false,
              timer: 2000,
              icon: "success"
            }).then(() => {
              window.location.reload();
            });
          },
          error: () => {
            console.error('Error al eliminar la nota con código ' + id);
          }
        });
      }
    });
  }
}
