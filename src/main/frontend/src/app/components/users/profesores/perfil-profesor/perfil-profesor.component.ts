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
import { Audicion } from '../../../../interfaces/audicion';
import { AudicionesService } from '../../../../services/audiciones.service';
import { AjustesPerfilProfesorComponent } from '../ajustes-perfil-profesor/ajustes-perfil-profesor.component';
import { ProfesoresService } from '../../../../services/profesores.service';
import { AjustarCalifComponent } from '../ajustar-calif/ajustar-calif.component';

@Component({
  selector: 'app-perfil-profesor',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="h-full flex flex-col bg-gray-100 shadow-xl">
    <div class="bg-blue-300 shadow-lg pb-3 rounded-b-3xl">
      <div class="flex rounded-b-3xl bg-blue-100 space-y-5 flex-col items-center py-7">
        <h1 class="text-4xl">{{profesor!.nombre}} {{profesor!.apellidos}}</h1>
        <a (click)="openAjustesDialog()"><span class="text-lg font-bold text-blue-700 cursor-pointer">Ajustes</span></a>
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
          <span class="text-2xl font-bold">{{audiciones.length}}</span>
          <span class="text-lg font-medium">Próximas audiciones</span>
        </div>
      </div>
    </div>
    <div class="py-16">
      <div class="mx-auto px-6 max-w-6xl">
        <div class="grid gap-3 grid-cols-6">
          <div class="col-span-2 flex flex-col justify-around items-center p-8 rounded-xl bg-blue-200 border border-gray-200">
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
                  {{ formatApellido(alumno.apellidos) }}, {{ alumno.nombre }}
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
            <p class="font-bold">Tareas pendientes totales: {{tareas.length}} </p>
            <div class="flex flex-col">
              <a (click)="openTasksDialog()" class="font-bold mt-2 cursor-pointer text-blue-800">Gestionar tareas</a>
              <a (click)="openCalifsDialog()" class="font-bold mt-2 cursor-pointer text-blue-800">Gestionar calificaciones</a>
            </div>
          </div>
          <div class="flex flex-col justify-around col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl">¡Hola, <span class="font-bold">{{profesor!.nombre}}</span>!</h1>
            <h1 class="w-full text-center text-2xl">Tenemos todo listo para que puedas gestionar tu trabajo a través de este portal.</h1>
            <h1 class="w-full text-center text-2xl">"La educación genera confianza. La educación genera esperanza. La educación genera paz."</h1>
          </div>
          <div class="flex flex-col justify-around items-center col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl mt-4 mb-4">Hoy es <span class="uppercase font-bold">{{ todayString }}</span></h1>
            <div *ngIf="todayClases.length > 0" class="flex flex-col">
              <p class="text-xl">Estas son tus <span class="font-bold">clases de hoy</span>:</p>
              <table class="mt-8 mb-16">
                <thead>
                  <tr class="uppercase">
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                        Alumno/a
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
                        Hora
                    </th>
                  </tr>
                </thead>
                <tbody *ngFor="let clase of todayClases">
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                      {{  getNombreAlumno(clase.idAlumno) }}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
                      {{ clase.hora }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div *ngIf="todayClases.length == 0" class="h-full flex flex-col">
              <p class="w-full mt-2 text-center text-2xl mt-4">No tienes clases hoy. ¡Descansa!</p>
              <img src="https://todocaritafeliz.com/wp-content/uploads/2023/05/Emoji-carita-feliz-happy-face-cara-sonriente-cara-feliz.png">
            </div>
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
          <div class="flex flex-col col-span-full lg:col-span-3 overflow-hidden p-8 rounded-xl bg-blue-200 border border-gray-200">
            <h1 class="w-full text-center text-2xl font-bold mb-4">Próximas audiciones</h1>
            <div *ngIf="audiciones.length > 0" class="flex flex-col items-center justify-around h-full">
              <p class="text-xl mb-2">Estas son las <span class="font-bold">próximas audiciones</span>:</p>
              <table class="mt-2 mb-20">
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
                      {{ alumnos.length }}
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
  today: Date = new Date();
  todayClases: Clase[] = [];
  todayString: string = "";
  tareas: Tarea[] = [];
  audiciones: Audicion[] = [];

  constructor(
    private alumnosService: AlumnosService, private clasesService: ClasesService, private profesoresService: ProfesoresService,
    private tareasService: TareaService, public dialog: MatDialog, private audicionService: AudicionesService
  ) { }

  ngOnInit(): void {
    let profesorString = localStorage.getItem("usuario");
    this.profesor = profesorString ? JSON.parse(profesorString) : null;
    this.idAlumno = this.profesor ? this.profesor.id : 0;
    let diaSemanaInt = this.today.getDay();
    switch (diaSemanaInt) {
      case 0:
        this.todayString = "Domingo";
        break;
      case 1:
        this.todayString = "Lunes";
        break;
      case 2:
        this.todayString = "Martes";
        break;
      case 3:
        this.todayString = "Miércoles";
        break;
      case 4:
        this.todayString = "Jueves";
        break;
      case 5:
        this.todayString = "Viernes";
        break;
      case 6:
        this.todayString = "Sábado";
        break;
    }

    this.alumnosService.getAll().subscribe({
      next: (alumnos: Alumno[]) => {
        alumnos.forEach(alumno => {
          if (alumno.idInstrumento == this.profesor!.idInstrumento) {
            this.alumnos.push(alumno);
          }
        });
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
            if (clase.dia == this.todayString) {
              this.todayClases.push(clase);
            }
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

    this.audicionService.getAll().subscribe({
      next: (audiciones: Audicion[]) => {
        audiciones.forEach(audicion => {
          if (audicion.idInstrumento == this.profesor!.idInstrumento) {
            this.audiciones.push(audicion);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de audiciones:', error);
      }
    });
  }

  formatApellido(apellidos: string): string {
    let partes = apellidos.split(' ');
    return partes.length > 1 ? `${partes[0]} ${partes[1][0]}.` : apellidos;
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

  openAjustesDialog() {
    let dialog = this.dialog.open(AjustesPerfilProfesorComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: this.profesor!.password
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.profesor!.password = result;
        this.profesoresService.update(this.profesor!, this.profesor!.id).subscribe({
          next: () => { },
          error: (error) => {
            console.error(error);
          }
        });
      }
    })
  }

  openTasksDialog() {
    let dialogData = {
      alumnos: this.alumnos,
      profesor: this.profesor
    }

    this.dialog.open(AjustarTareasComponent, {
      width: '500px',
      height: '300px',
      data: dialogData
    });
  }

  openCalifsDialog() {
    let dialogData = {
      alumnos: this.alumnos,
      profesor: this.profesor
    }

    this.dialog.open(AjustarCalifComponent, {
      width: '500px',
      height: '300px',
      data: dialogData
    });
  }

  getNombreAlumno(idAlumno: number): string {
    let alumno = this.alumnos.find(alumno => alumno.id === idAlumno);
    return alumno!.nombre + ' ' + this.formatApellido(alumno!.apellidos);
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
