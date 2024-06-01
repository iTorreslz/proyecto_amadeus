import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../../../interfaces/alumno';
import { RouterLink } from '@angular/router';
import { Profesor } from '../../../../interfaces/profesor';

@Component({
  selector: 'app-ajustar-calif',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterLink],
  template: `
  <div *ngIf="alumnos.length > 0" class="h-full w-2/3 flex flex-col justify-center m-auto">
    <a (click)="close()" [routerLink]="['/nueva-calif', profesor.id]"
      class="font-bold text-center bg-blue-800 w-full text-2xl text-blue-100 rounded p-2 cursor-pointer hover:bg-blue-600">
      Asignar nueva calificación
    </a>
    <p class="font-bold text-center w-full text-2xl p-2 mt-4">Ver calificaciones del alumno:</p>
    <div class="font-bold text-center bg-blue-800 w-full text-2xl text-blue-100 rounded p-2
      cursor-pointer hover:bg-blue-600 mt-2"
      *ngFor="let alumno of alumnos">
      <a (click)="close()" [routerLink]="['/califs-alum', alumno.id, 'prof', profesor.id]">
        {{alumno.nombre}} {{alumno.apellidos}}
      </a>
    </div>
  </div>
  <div *ngIf="alumnos.length == 0" class="h-full w-2/3 flex flex-col justify-center m-auto">
    <p class="font-bold text-center w-full text-2xl p-2 mt-4" *ngIf="alumnos.length == 0">Ningún alumno matriculado aún.</p>
  </div>
  `,
  styleUrl: './ajustar-calif.component.css'
})
export class AjustarCalifComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<AjustarCalifComponent>
  ) { }

  alumnos: Alumno[] = this.data.alumnos;
  profesor: Profesor = this.data.profesor;

  close() {
    this.dialog.close();
  }
}
