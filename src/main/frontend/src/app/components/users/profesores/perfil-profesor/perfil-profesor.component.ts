import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../../../interfaces/profesor';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import { Clase } from '../../../../interfaces/clase';
import { ClasesService } from '../../../../services/clases.service';
import { Tarea } from '../../../../interfaces/tarea';
import { TareaService } from '../../../../services/tareas.service';
import { MatDialog } from '@angular/material/dialog';
import { AjustarTareasComponent } from '../ajustar-tareas/ajustar-tareas.component';

@Component({
  selector: 'app-perfil-profesor',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="h-full flex flex-col bg-gray-100 shadow-xl">
    <div class="bg-blue-300 shadow-lg pb-3 rounded-b-3xl">
      <div class="flex rounded-b-3xl bg-blue-100 space-y-5 flex-col items-center py-7">
        <h1 class="text-4xl">{{profesor!.nombre}} {{profesor!.apellidos}}</h1>
        <a href="#"><span class="text-lg font-bold text-blue-700">Ajustes</span></a>
      </div>
      <div class="grid px-7 py-2 items-center justify-around grid-cols-3 gap-4 divide-x divide-solid">
        <div class="col-span-1 flex flex-col items-center">
          <span class="text-2xl font-bold">{{alumnos.length}}</span>
          <span class="text-lg font-medium">Alumnos</span>
        </div>
        <div class="col-span-1 px-3 flex flex-col items-center">
          <span class="text-2xl font-bold">{{getInstrumento(profesor!.idInstrumento)}}</span>
          <span class="text-lg font-medium">Instrumento</span>
        </div>
        <div class="col-span-1 px-3 flex flex-col items-center">
          <span class="text-2xl font-bold">2</span>
          <span class="text-lg font-medium">Próximas audiciones</span>
        </div>
      </div>
    </div>
    <div class="py-16">
      <div class="mx-auto px-6 max-w-6xl">
        <div class="grid gap-3 grid-cols-6">
          <div class="col-span-2 flex flex-col items-center p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Alumnos</h1>
            <table class="mt-4">
              <thead>
                <tr class="uppercase">
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Nombre
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Tareas
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Clase
                  </th>
                </tr>
              </thead>
              <tbody *ngFor="let alumno of alumnos.slice(0, 3)">
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                    {{ alumno.nombre }}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                    {{checkTareas(alumno!.id)}}
                  </td>
                  <td *ngIf="checkClases(alumno.id) !== undefined" class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                    {{checkClases(alumno.id)}}
                  </td>
                  <td *ngIf="checkClases(alumno.id) === undefined" class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                    <p>Aún no asignada</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="font-bold mt-4">Tareas pendientes totales: {{tareas.length}} </p>
            <a (click)="openTasksDialog()" class="font-bold mt-2 cursor-pointer text-blue-800">Gestionar tareas</a>
          </div>
          <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl">¡Hola, <span class="font-bold">{{profesor!.nombre}}</span>!</h1>
            <h1 class="w-full mt-2 text-center text-2xl">Tenemos todo listo para que puedas gestionar tu trabajo a través de este portal.</h1>
            <h1 class="w-full mt-12 text-center text-2xl">"La educación genera confianza. La educación genera esperanza. La educación genera paz."</h1>
          </div>
          <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Audiciones</h1>
          </div>
          <div class="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Material docente</h1>
            <div class="w-full max-w-md w-full mx-auto bg-blue-100 rounded-md px-6 py-4 my-6">
            <div class="flex flex-col items-center">
              <a class="font-bold bg-blue-800 w-full text-2xl text-blue-100 rounded p-2 cursor-pointer">
                Programación didáctica 2024-25
              </a>
              <a class="font-bold bg-blue-800 w-full text-2xl text-blue-100 rounded p-2 mt-4 cursor-pointer">
                Contenidos de la asignatura 
              </a>
              <a class="font-bold bg-blue-800 w-full text-2xl text-blue-100 rounded p-2 mt-4 cursor-pointer">
                Metodología
              </a>
              <a class="font-bold bg-blue-800 w-full text-2xl text-blue-100 rounded p-2 mt-4 cursor-pointer">
                Materiales y recursos didácticos
              </a>
            </div>
          </div>
        </div>
          <div class="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Calificaciones alumnos</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './perfil-profesor.component.css'
})
export class PerfilProfesorComponent {
  profesor: Profesor | undefined;
  idAlumno: number = 0;
  alumnos: Alumno[] = [];
  clases: Clase[] = [];
  tareas: Tarea[] = [];

  constructor(private alumnosService: AlumnosService, private clasesService: ClasesService,
    private tareasService: TareaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let profesorString = localStorage.getItem("usuario");
    this.profesor = profesorString ? JSON.parse(profesorString) : null;
    this.idAlumno = this.profesor ? this.profesor.id : 0;

    this.alumnosService.getAll().subscribe({
      next: (alumnos: Alumno[]) => {
        alumnos.forEach(alumno => {
          if (alumno.idInstrumento == this.profesor!.idInstrumento) {
            this.alumnos.push(alumno);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de alumnos:', error);
      }
    });

    this.clasesService.getAll().subscribe({
      next: (clases: Clase[]) => {
        clases.forEach(clase => {
          if (clase.idProfesor == this.profesor!.id && clase.idAlumno) {
            this.clases.push(clase);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de clases:', error);
      }
    });

    this.tareasService.getAll().subscribe({
      next: (tareas: Tarea[]) => {
        tareas.forEach(tarea => {
          if (tarea.idProfesor == this.profesor!.id && !tarea.completada) {
            this.tareas.push(tarea);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de tareas:', error);
      }
    });
  }

  checkClases(idAlumno: number): string | undefined {
    for (let clase of this.clases) {
      if (clase.idAlumno === idAlumno) {
        return clase.dia + " | " + clase.hora;
      }
    }
    return undefined;
  }

  checkTareas(idAlumno: number): number {
    let count = 0;
    for (let tarea of this.tareas) {
      if (tarea.idAlumno === idAlumno && !tarea.completada) {
        count++;
      }
    }
    return count;
  }

  openTasksDialog() {
    let dialogData = {
      alumnos: this.alumnos,
      profesor: this.profesor
    }

    let dialogRef = this.dialog.open(AjustarTareasComponent, {
      width: '500px',
      height: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
      console.log('Resultado:', result);
    });
  }

  getInstrumento(idInstrumento: number) {
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
