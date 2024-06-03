import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewNota } from '../../../../interfaces/NewNota';
import { Nota } from '../../../../interfaces/Nota';
import { Alumno } from '../../../../interfaces/alumno';
import { Profesor } from '../../../../interfaces/profesor';
import { AlumnosService } from '../../../../services/alumnos.service';
import { ProfesoresService } from '../../../../services/profesores.service';
import { NotasService } from '../../../../services/notas-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-calif',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="rounded max-w-sm m-auto bg-blue-200">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Editar calificación {{this.nota!.id}}
      </h4>
    </div>
    <div class="flex flex-col items-center">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600 mr-2">Nombre</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="nombre" [value]="nota!.nombre"
          #nombre>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600 mr-2">Calificación</label>
        <input type="number" class="text-base font-medium text-navy-700 w-48" name="calif" [value]="nota!.calificacion"
          #calif>
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
      <button type="submit" (click)="this.editarNota(nombre.value,calif.value,idAlumno.value)"
        class="p-2 m-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './editar-calif.component.css'
})
export class EditarCalifComponent {
  nota: Nota | undefined;
  editedNota: NewNota | undefined;
  alumnos: Alumno[] = [];
  profesor: Profesor | undefined;

  constructor(
    private route: ActivatedRoute, private notasService: NotasService, private router: Router,
    private alumnosService: AlumnosService, private profesorService: ProfesoresService
  ) { }

  ngOnInit(): void {
    let idNota = parseInt(this.route.snapshot.params['id']);
    this.notasService.getById(idNota).subscribe({
      next: (nota: Nota) => {
        this.nota = nota;
        this.profesorService.getById(this.nota.idProfesor).subscribe({
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

  editarNota(nombre: string, calif: string, idAlumno: string) {
    this.editedNota = {
      nombre: nombre,
      calificacion: parseInt(calif),
      idAlumno: parseInt(idAlumno),
      idProfesor: this.nota!.idProfesor
    };
    this.notasService.update(this.editedNota, this.nota!.id).subscribe({
      next: () => {
        Swal.fire({
          title: "¡Hecho!",
          text: "Cambios guardados.",
          showConfirmButton: false,
          timer: 1500,
          icon: "success"
        }).then(() => {
          this.router.navigate(['/notas-alum/' + idAlumno + '/prof/' + this.nota!.idProfesor]);
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
