import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../../../services/alumnos.service';
import { ProfesoresService } from '../../../../services/profesores.service';
import { TareaService } from '../../../../services/tareas.service';
import { NewTarea } from '../../../../interfaces/newTarea';
import { Profesor } from '../../../../interfaces/profesor';
import { Alumno } from '../../../../interfaces/alumno';

@Component({
  selector: 'app-crear-tareas',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-blue-200 w-fit max-w-6xl m-auto mt-1 p-4 rounded">
    <h4 class="text-xl text-center font-bold text-navy-700">
      Publicar nueva tarea
    </h4>
    <div class="w-fit m-auto flex flex-col border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4">
        <label class="text-sm text-gray-600 mr-2">Fecha entrega</label>
        <input type="date" class="text-base font-medium text-navy-700 w-48" name="fecha"
          #fechaEntrega>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4">
        <label class="text-sm text-gray-600 mr-2">Hora entrega</label>
        <input type="time" class="text-base font-medium text-navy-700 w-48" name="time"
          #horaEntrega>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4">
        <label for="alumno" class="block text-sm font-medium text-gray-700">Alumno</label>
        <select id="alumno" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          #alumno>
          <option *ngFor="let alumno of alumnos" [value]="alumno.id">
            {{ alumno.nombre }} {{ alumno.apellidos }}
          </option>
        </select>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4">
        <label class="text-sm text-gray-600">Descripción</label>
        <textarea id="descripcion" class="mt-2 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows="7" #descripcion>
        </textarea>
      </div>
      <button type="submit" (click)="this.asignarTarea(fechaEntrega.value, horaEntrega.value, alumno.value, descripcion.value)"
        class="p-2 mt-2 w-fit m-auto bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Asignar tarea
      </button>
    </div>
  </div>
  `,
  styleUrl: './crear-tareas.component.css'
})
export class CrearTareasComponent {

  today: Date = new Date();
  todayString: string = "";
  newTarea: NewTarea | undefined;
  profesor: Profesor | undefined;
  alumnos: Alumno[] = [];

  constructor(
    private route: ActivatedRoute, private alumnosService: AlumnosService,
    private tareasService: TareaService, private profesorService: ProfesoresService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['idProfesor'];
    this.profesorService.getById(id).subscribe({
      next: (profesor: Profesor) => {
        this.profesor = profesor;
      }
    });
    this.alumnosService.getAll().subscribe({
      next: (alumnos: Alumno[]) => {
        this.alumnos = alumnos.filter(alumno => alumno.idInstrumento == this.profesor!.idInstrumento);
      }
    });

    let anyo: number = this.today.getFullYear();
    let mes: number = this.today.getMonth() + 1;
    let dia: number = this.today.getDate();
    let horas: number = this.today.getHours();
    let minutos: number = this.today.getMinutes();

    this.todayString = `${this.ceros(dia)}/${this.ceros(mes)}/${anyo} ${this.ceros(horas)}:${this.ceros(minutos)}`;
  }

  ceros(number: number): string {
    if (number < 10) {
      return '0' + number;
    }
    return number.toString();
  }

  asignarTarea(fechaEntrega: string, horaEntrega: string, idAlumno: string, descripcion: string) {
    let fechaEntregaSplitted: string[] = fechaEntrega.split('-');
    fechaEntrega = `${fechaEntregaSplitted[2]}/${fechaEntregaSplitted[1]}/${fechaEntregaSplitted[0]}`;

    this.newTarea = {
      fechaPublicacionString: this.todayString,
      fechaEntregaString: fechaEntrega + " " + horaEntrega,
      idAlumno: parseInt(idAlumno),
      idProfesor: this.profesor!.id,
      descripcion: descripcion
    }

    this.tareasService.create(this.newTarea).subscribe({
      next: () => {
        window.location.reload();
      }
    });
  }
}
