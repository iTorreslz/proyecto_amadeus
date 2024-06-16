import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../../../interfaces/alumno';
import { NewClase } from '../../../../interfaces/newClase';
import { Profesor } from '../../../../interfaces/profesor';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-alumnado-asignar-clase',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="mt-20 w-96 mx-auto rounded-xl bg-white shadow-md">
    <div
        class="mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-800 to-blue-300 text-white shadow-lg">
        <h3 class="text-3xl text-center">Asignar clase a {{alumno!.nombre}} {{alumno!.apellidos}}</h3>
    </div>
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-center h-11 w-full text-xl">
        <label class="mr-2" for="diaSelect">Escoge el día:</label>
        <select class="border rounded border-gray-300 p-1" id="diaSelect" #dia>
          <option *ngFor="let opcion of opcionesDias">
          {{ opcion }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-center h-11 w-full text-xl">
        <label class="mr-2" for="horaSelect">Escoge la hora:</label>
        <select class="border rounded border-gray-300 p-1" id="horaSelect" #hora>
          <option *ngFor="let opcion of opcionesHoras">
          {{ opcion }}
          </option>
        </select>
      </div>
      <button
        class="w-full h-11 rounded-lg bg-gradient-to-tr from-blue-800 to-blue-300 text-xl font-bold text-white shadow-md transition-all hover:shadow-lg hover:from-blue-600 hover:to-blue-200 active:opacity-85"
        type="button" (click)="asignarClase(dia.value,hora.value)">Asignar clase</button>
    </div>
  </div>
  `,
  styleUrl: './alumnado-asignar-clase.component.css'
})
export class AlumnadoAsignarClaseComponent {
  opcionesDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  opcionesHoras: string[] = ['15:00', '15:30', '16:00', '16:30', '17:00',
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
  alumno: Alumno | undefined;
  profesor: Profesor | undefined;
  clase: NewClase | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alumno, private dialog: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit() {
    this.alumno = this.data;
  }

  asignarClase(dia: string, hora: string) {
    this.clase = {
      dia: dia,
      hora: hora,
      idAlumno: this.alumno!.id
    };
    
    this.dialog.close(this.clase);
  }
}
