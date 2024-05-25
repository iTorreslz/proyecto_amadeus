import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../../../interfaces/alumno';
import { RouterLink } from '@angular/router';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';
import { ClasesService } from '../../../../services/clases.service';
import { Clase } from '../../../../interfaces/clase';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="h-full flex flex-col bg-gray-100 shadow-xl">
    <div class="bg-blue-300 shadow-lg pb-3 rounded-b-3xl">
      <div class="flex rounded-b-3xl bg-blue-100 space-y-5 flex-col items-center py-7">
        <h1 class="text-4xl">{{alumno!.nombre}} {{alumno!.apellidos}}</h1>
        <a href="#"><span class="text-lg font-bold text-blue-700">Ajustes</span></a>
      </div>
      <div class="grid px-7 py-2 items-center justify-around grid-cols-3 gap-4 divide-x divide-solid">
        <div class="col-span-1 flex flex-col items-center" *ngIf="alumno!.idInstrumento !== -1">
          <span class="text-2xl font-bold">0</span>
          <span class="text-lg font-medium">Tareas pendientes</span>
        </div>
        <div class="col-span-1 px-3 flex flex-col items-center" *ngIf="alumno!.idInstrumento !== -1">
          <span class="text-2xl font-bold">{{getInstrumento(alumno!.idInstrumento)}}</span>
          <span class="text-lg font-medium">Instrumento</span>
        </div>
        <div class="col-span-1 px-3 flex flex-col items-center" *ngIf="alumno!.idInstrumento !== -1">
          <span class="text-2xl font-bold">2</span>
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
          <div class="col-span-2 flex flex-col p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Tareas</h1>
            <table class="w-full mt-4">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-center">Tarea</th>
                  <th class="px-4 py-2 text-center">Fecha</th>
                  <th class="px-4 py-2 text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="px-4 py-2">Tarea 1</td>
                  <td class="px-4 py-2">2024-05-23</td>
                  <td class="px-4 py-2">Completada</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">Tarea 2</td>
                  <td class="px-4 py-2">2024-05-24</td>
                  <td class="px-4 py-2">Pendiente</td>
                </tr>
                <!-- Agrega más filas según sea necesario -->
              </tbody>
            </table>
          </div>
          <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl mb-4">¡Hola, <span class="font-bold">{{alumno?.nombre}}</span>!</h1>
            <h1 *ngIf="clase != undefined" class="w-full text-center text-xl">Tus clases de {{getInstrumento(alumno!.idInstrumento)}} son los {{clase!.dia.toLowerCase()}} a las {{clase!.hora}} de la tarde.</h1>
            <h1 *ngIf="clase == undefined" class="w-full text-center text-xl">Tus clases no han sido asignadas aún pero, en menos de 24 horas laborables, un responsable se hará cargo de ello.</h1>
            <h1 class="w-full text-center text-xl">Las clases comienzan el 1 de octubre y acaban el 12 de junio; y recuerda que todas duran 30 minutos.</h1>
            <h1 class="w-full text-center text-xl">Cualquier duda o cuestión la podrás consultar con tu profesor, o llamando al 952481779.</h1>
          </div>
          <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold">Audiciones</h1>
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

  constructor(private profesoresService: ProfesoresService, private clasesService: ClasesService) { }

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
