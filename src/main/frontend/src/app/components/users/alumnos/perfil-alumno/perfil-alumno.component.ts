import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../../../interfaces/alumno';
import { RouterLink } from '@angular/router';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';
import { ClasesService } from '../../../../services/clases.service';
import { Clase } from '../../../../interfaces/clase';
import { Tarea } from '../../../../interfaces/tarea';
import { TareaService } from '../../../../services/tareas.service';
import { Audicion } from '../../../../interfaces/audicion';
import { AudicionesService } from '../../../../services/audiciones.service';
import { AlumnosService } from '../../../../services/alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { AjustesPerfilProfesorComponent } from '../../profesores/ajustes-perfil-profesor/ajustes-perfil-profesor.component';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="h-full flex flex-col bg-gray-100 shadow-xl">
    <div class="bg-blue-300 shadow-lg pb-3 rounded-b-3xl">
      <div class="flex rounded-b-3xl bg-blue-100 space-y-5 flex-col items-center py-7">
        <h1 class="text-4xl">{{alumno!.nombre}} {{alumno!.apellidos}}</h1>
        <a (click)="openAjustesDialog()"><span class="text-lg font-bold text-blue-700 cursor-pointer">Ajustes</span></a>
      </div>
      <div class="grid px-7 py-2 items-center justify-around grid-cols-3 gap-4 divide-x divide-solid">
        <div class="col-span-1 flex flex-col items-center" *ngIf="alumno!.idInstrumento !== -1">
          <span class="text-2xl font-bold">{{tareas.length}}</span>
          <span class="text-lg font-medium">Tareas pendientes</span>
        </div>
        <div class="col-span-1 px-3 flex flex-col items-center" *ngIf="alumno!.idInstrumento !== -1">
          <span class="text-2xl font-bold">{{getInstrumento(alumno!.idInstrumento)}}</span>
          <span class="text-lg font-medium">Instrumento</span>
        </div>
        <div class="col-span-1 px-3 flex flex-col items-center" *ngIf="alumno!.idInstrumento !== -1">
          <span class="text-2xl font-bold">{{ audiciones.length }}</span>
          <span class="text-lg font-medium">Próximas audiciones</span>
        </div>
      </div>
      <div class="w-full flex items-center justify-center" *ngIf="alumno!.idInstrumento == -1">
        <span class="text-lg font-medium">Instrumento no asignado. Aún no has sido admitido en la escuela. Clique <a [routerLink]="['/admisiones/nuevo']" class="font-bold text-blue-700 cursor-pointer">AQUÍ</a> para solicitar una nueva admisión.</span>
      </div>
    </div>
    <div class="py-16" *ngIf="alumno!.idInstrumento !== -1">
      <div class="mx-auto px-6 max-w-6xl">
        <div class="grid gap-3 grid-cols-6">
          <div class="col-span-2 flex flex-col justify-around items-center p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Tareas</h1>
            <table class="mt-4">
              <thead>
                <tr class="uppercase">
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Nombre
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Entrega
                  </th>
                  <th
                      class="bg-blue-100">
                  </th>
                </tr>
              </thead>
              <tbody *ngFor="let tarea of tareas">
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                  {{ tarea.id }}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                    {{ formatDate(tarea.fechaEntrega) }}
                  </td>
                  <td class="px-3 py-5 border-b border-gray-200 bg-white text-blue-900">
                    <a>Completar</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="font-bold">Tareas pendientes totales: {{tareas.length}} </p>
            <div class="flex flex-col">
              <a [routerLink]="['/tareas-alum', alumno!.id]" class="font-bold mt-2 cursor-pointer text-blue-800">Ver todas las tareas</a>
              <a class="font-bold mt-2 cursor-pointer text-blue-800">Ver calificaciones</a>
            </div>
          </div>
          <div class="flex flex-col justify-around col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl mb-4">¡Hola, <span class="font-bold">{{alumno?.nombre}}</span>!</h1>
            <h1 *ngIf="clase != undefined" class="w-full text-center text-xl">Tus clases de {{getInstrumento(alumno!.idInstrumento)}} son los {{clase!.dia.toLowerCase()}} a las {{clase!.hora}} de la tarde.</h1>
            <h1 *ngIf="clase == undefined" class="w-full text-center text-xl">Tus clases no han sido asignadas aún pero, en menos de 24 horas laborables, un responsable se hará cargo de ello.</h1>
            <h1 class="w-full text-center text-xl">Las clases comienzan el 1 de octubre y acaban el 12 de junio; y recuerda que todas duran 30 minutos.</h1>
            <h1 class="w-full text-center text-xl mb-4">Cualquier duda o cuestión la podrás consultar con tu profesor, o llamando al teléfono del centro: 952 481 779.</h1>
          </div>
          <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Próximas audiciones</h1>
            <div *ngIf="audiciones.length > 0" class="flex flex-col items-center justify-around h-full">
              <p class="text-xl mb-2 text-center">Estas son las <span class="font-bold">próximas audiciones</span>:</p>
              <table class="mb-32">
                <thead>
                  <tr class="uppercase">
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Día | Hora
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                      Intérpretes
                    </th>
                  </tr>
                </thead>
                <tbody *ngFor="let a of audiciones">
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                      {{ formatDate(a.diaHora) }}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                      {{ alumnosAudicion.length }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div *ngIf="audiciones.length == 0" class="h-full flex flex-col justify-between items-center">
              <p class="w-full mt-2 text-center text-2xl mt-4">Aún no hay audiciones programadas.</p>
              <p class="w-full mt-2 text-center text-2xl mt-4">En cuanto se anuncie una audición de tu especialidad podrás verlo aquí.</p>
              <p class="w-full mt-2 text-center text-2xl mt-4 m-10">Cualquier posible error o falta de actualización comunicarlo al Centro o a Jefatura de Estudios.</p>
            </div>
          </div>
          <div class="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Profesor</h1>
            <div class="w-full max-w-md w-full mx-auto bg-blue-100 rounded-md px-6 py-4 my-6">
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <img class="h-12 w-12 rounded-full" src="https://lh3.googleusercontent.com/a-/AOh14Gi0DgItGDTATTFV6lPiVrqtja6RZ_qrY91zg42o-g" alt="">
                  <div class="ml-2">
                    <h3 class="text-lg text-gray-800 font-medium">{{profesor?.nombre}}</h3>
                    <h3 class="text-xs text-gray-800 font-medium">{{profesor?.email}}</h3>
                  </div>
                </div>
                <div class="mt-2 sm:mt-0">
                  <button class="flex items-center text-white bg-blue-600 rounded px-2 py-1 hover:bg-blue-500 focus:outline-none focus:shadow-outline">
                    <span class="ml-1 text-sm">Enviar Mensaje</span>
                  </button>
                </div>
              </div>
              <div class="flex justify-between mt-4">
                <div class="flex flex-col justify-between mt-4">
                  <div>
                    <h4 class="text-gray-600 text-sm">Nombre</h4>
                    <span class="mt-2 text-xl font-medium text-gray-800">{{profesor?.nombre}}</span>
                  </div>
                  <div>
                    <h4 class="text-gray-600 text-sm">Apellidos</h4>
                    <span class="mt-2 text-xl font-medium text-gray-800">{{profesor?.apellidos}}</span>
                  </div>
                </div>
                <div class="w-1/2 mt-4">
                  <h4 class="text-sm text-gray-600">Este es el perfil de tu profesor de {{getInstrumento(profesor!.idInstrumento)}}.<br>Puedes consultarle cualquier duda o cuestión referente a las tareas o a las clases semanales.</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Notas</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './perfil-alumno.component.css'
})
export class PerfilAlumnoComponent {
  alumno: Alumno | undefined;
  idAlumno: number = 0;
  profesores: Profesor[] = [];
  profesor: Profesor | undefined;
  clase: Clase | undefined;
  tareas: Tarea[] = [];
  audiciones: Audicion[] = [];
  alumnosAudicion: Alumno[] = [];

  constructor(
    private profesoresService: ProfesoresService, private clasesService: ClasesService,
    private tareasService: TareaService, private audicionService: AudicionesService,
    private alumnosService: AlumnosService, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let alumnoString = localStorage.getItem("usuario");
    this.alumno = alumnoString ? JSON.parse(alumnoString) : null;
    this.idAlumno = this.alumno ? this.alumno.id : 0;

    this.profesoresService.getAll().subscribe({
      next: (profesores: Profesor[]) => {
        this.profesores = profesores;
        profesores.forEach(profesor => {
          if (profesor.idInstrumento == this.alumno!.idInstrumento) {
            this.profesor = profesor;
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener la lista de profesores:', error);
      }
    });

    this.tareasService.getAll().subscribe({
      next: (tareas: Tarea[]) => {
        tareas.forEach(tarea => {
          if (tarea.idAlumno == this.alumno!.id && !tarea.completada) {
            this.tareas.push(tarea);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de tareas:', error);
      }
    });

    this.audicionService.getAll().subscribe({
      next: (audiciones: Audicion[]) => {
        audiciones.forEach(audicion => {
          if (audicion.idInstrumento == this.alumno!.idInstrumento) {
            this.audiciones.push(audicion);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de audiciones:', error);
      }
    });

    this.alumnosService.getAll().subscribe({
      next: (alumnos: Alumno[]) => {
        alumnos.forEach(alumno => {
          if (alumno.idInstrumento == this.alumno!.idInstrumento) {
            this.alumnosAudicion.push(alumno);
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
          if (clase.idAlumno == this.idAlumno) {
            this.clase = clase;
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener la lista de clases:', error);
      }
    });
  }

  openAjustesDialog() {
    let dialog = this.dialog.open(AjustesPerfilProfesorComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: this.alumno!.password
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.alumno!.password = result;
        this.alumnosService.update(this.alumno!, this.alumno!.id).subscribe({
          next: () => { },
          error: (error) => {
            console.error(error);
          }
        });
      }
    })
  }

  formatDate(date: string): string {
    return date.replace("T", " ").replaceAll("-", "/").slice(0, -3);
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
