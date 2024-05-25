import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import { TareaService } from '../../../../services/tareas.service';
import { Tarea } from '../../../../interfaces/tarea';
import { ProfesoresService } from '../../../../services/profesores.service';
import { Profesor } from '../../../../interfaces/profesor';

@Component({
  selector: 'app-ver-tareas',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="max-w-6xl m-auto">
    <div class="flex items-center justify-center text-xl h-64" *ngIf="tareas.length == 0">
      <p>Ninguna tarea asignada aún.</p>
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
              Descripción
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
            {{ tarea.descripcion }}
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
          <td class="px-5 py-5 font-bold border-b border-gray-200 bg-white text-blue-900"
            [ngClass]="{ 'completada': tarea.completada, 'pendiente': !tarea.completada }">
            {{ checkTarea(tarea.completada) }}
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
    private route: ActivatedRoute, private alumnosService: AlumnosService,
    private tareasService: TareaService, private profesorService: ProfesoresService
  ) { }

  ngOnInit(): void {
    let idAlumno = parseInt(this.route.snapshot.params['idAlumno']);
    let idProfesor = parseInt(this.route.snapshot.params['idProfesor']);
    this.alumnosService.getById(idAlumno).subscribe({
      next: (alumno: Alumno) => {
        this.alumno = alumno;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.profesorService.getById(idProfesor).subscribe({
      next: (profesor: Profesor) => {
        this.profesor = profesor;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.tareasService.getAll().subscribe({
      next: (tareas: Tarea[]) => {
        tareas.forEach(tarea => {
          if (tarea.idAlumno == this.alumno!.id && tarea.idProfesor == this.profesor!.id) {
            this.tareas.push(tarea);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de tareas:', error);
      }
    });
  }

  formatDate(date: string): string {
    return date.replace("T"," ").replaceAll("-","/").slice(0, -3);
  }

  checkTarea(completada: boolean): string {
    if (completada) {
      return "Completada";
    }
    return "Pendiente";
  }
}
