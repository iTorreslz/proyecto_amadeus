import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarea } from '../../../../interfaces/tarea';
import { TareaService } from '../../../../services/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTarea } from '../../../../interfaces/newTarea';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';

@Component({
  selector: 'app-editar-tareas',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="max-w-4xl m-auto">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Editar tarea {{this.tarea!.id}}
      </h4>
    </div>
    <div class="flex flex-col items-center">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600 mr-2">Fecha entrega</label>
        <input type="date" class="text-base font-medium text-navy-700 w-48" name="fechaEntrega" [value]="formatDate(tarea!.fechaEntrega)"
          #fechaEntrega>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600 mr-2">Fecha entrega</label>
        <input type="time" class="text-base font-medium text-navy-700 w-48" name="horaEntrega" [value]="formatTime(tarea!.fechaEntrega)"
          #horaEntrega>
      </div>
      <div class="flex items-center rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600 mr-2">Alumno</label>
        <select id="alumno" class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          #idAlumno>
          <option *ngFor="let alumno of alumnos" [value]="alumno.id">
            {{ alumno.nombre }} {{ alumno.apellidos }}
          </option>
        </select>
      </div>
      <div class="flex rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600 mr-2">Descripción</label>
        <textarea name="descripcion" id="descripcion" class="text-base font-medium text-navy-700 w-48"
          rows="7" #descripcion [value]="tarea!.descripcion"></textarea>
      </div>
      <button type="submit" (click)="this.editarTarea(fechaEntrega.value,horaEntrega.value,idAlumno.value,descripcion.value)"
        class="p-2 m-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './editar-tareas.component.css'
})
export class EditarTareasComponent {
  tarea: Tarea | undefined;
  editedTarea: NewTarea | undefined;
  alumnos: Alumno[] = [];
  profesor: Profesor | undefined;

  constructor(
    private route: ActivatedRoute, private tareasService: TareaService, private router: Router,
    private alumnosService: AlumnosService, private profesorService: ProfesoresService
  ) { }

  ngOnInit(): void {
    let idTarea = parseInt(this.route.snapshot.params['id']);
    this.tareasService.getById(idTarea).subscribe({
      next: (tarea: Tarea) => {
        this.tarea = tarea;
        this.profesorService.getById(this.tarea.idProfesor).subscribe({
          next: (profesor: Profesor) => {
            this.profesor = profesor;
            this.alumnosService.getAll().subscribe({
              next: (alumnos: Alumno[]) => {
                this.alumnos = alumnos.filter(alumno => alumno.idInstrumento === this.profesor!.idInstrumento);
              },
              error: (error) => {
                console.error(error);
              }
            });
          },
          error: (error) => {
            console.error(error);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editarTarea(fechaEntrega: string, horaEntrega: string, idAlumno: string, descripcion: string) {
    let fechaEntregaSplitted: string[] = fechaEntrega.split('-');
    fechaEntrega = `${fechaEntregaSplitted[2]}/${fechaEntregaSplitted[1]}/${fechaEntregaSplitted[0]}`;

    this.editedTarea = {
      fechaPublicacionString: "",
      fechaEntregaString: fechaEntrega + " " + horaEntrega,
      idAlumno: parseInt(idAlumno),
      idProfesor: this.tarea!.idProfesor,
      descripcion: descripcion
    };
    this.tareasService.update(this.editedTarea, this.tarea!.id).subscribe({
      next: () => {
        this.router.navigate(['/tareas-alum/' + idAlumno + '/prof/' + this.tarea!.idProfesor]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  formatDate(date: string): string {
    return date.slice(0, 10);
  }

  formatTime(date: string): string {
    return date.slice(11, 16);
  }
}
