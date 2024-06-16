import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewNota } from '../../../../interfaces/NewNota';
import { Alumno } from '../../../../interfaces/alumno';
import { Profesor } from '../../../../interfaces/profesor';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlumnosService } from '../../../../services/alumnos.service';
import { NotasService } from '../../../../services/notas-service';
import { ProfesoresService } from '../../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-calif',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="bg-blue-200 w-fit max-w-6xl m-auto mt-1 p-4 rounded">
    <h4 class="text-xl text-center font-bold text-navy-700">
      Publicar nueva calificación
    </h4>
    <div class="w-fit m-auto flex flex-col border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4 flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Nombre</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48  border rounded border-gray-300 p-1" name="nombre"
          #nombre>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4 flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Calificación</label>
        <input type="number" class="text-base font-medium text-navy-700 w-48  border rounded border-gray-300 p-1" min="0" max="10" name="calif"
          #calif>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4 flex flex-col items-center">
        <label for="alumno" class="block text-sm font-medium text-gray-700">Alumno</label>
        <select id="alumno" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          #alumno>
          <option *ngFor="let alumno of alumnos" [value]="alumno.id">
            {{ alumno.nombre }} {{ alumno.apellidos }}
          </option>
        </select>
      </div>
      <button type="submit" (click)="this.asignarCalif(nombre.value, calif.value, alumno.value)"
        class="p-2 mt-2 w-fit m-auto bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Establecer calificación
      </button>
      <a [routerLink]="['/perfil_profesor']" class="p-2 mt-2 w-fit m-auto bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">Cancelar</a>
    </div>
  </div>
  `,
  styleUrl: './nueva-calif.component.css'
})
export class NuevaCalifComponent {

  newCalif: NewNota | undefined;
  profesor: Profesor | undefined;
  alumnos: Alumno[] = [];

  constructor(
    private route: ActivatedRoute, private alumnosService: AlumnosService,
    private notasService: NotasService, private profesorService: ProfesoresService,
    private router: Router
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
  }

  validation(nombre: string, calif: string): string {

    let message = "";
    if (nombre === '' && calif === '') {
      message = "Nombre y calificación son obligatorios. Indique qué está calificando en el campo NOMBRE.";
    } else {
      if (nombre === '') {
        message = message + "El nombre de la calificación es obligatorio. Indique qué está calificando. ";
      }
      if (calif === '') {
        message = message + "La calificación es obligatoria. ";
      }
    }
    return message;
  }

  asignarCalif(nombre: string, calif: string, idAlumno: string) {

    let message = this.validation(nombre, calif);

    if (message === "") {
      this.newCalif = {
        nombre: nombre,
        calificacion: parseInt(calif),
        idAlumno: parseInt(idAlumno),
        idProfesor: this.profesor!.id
      }

      this.notasService.create(this.newCalif).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Hecho!",
            text: "Nota asignada correctamente.",
            showConfirmButton: false,
            timer: 2000,
            icon: "success"
          }).then(() => {
            this.router.navigate(['/perfil_profesor']);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error: campos vacíos',
        text: this.validation(nombre, calif),
      })
    }
  }
}
