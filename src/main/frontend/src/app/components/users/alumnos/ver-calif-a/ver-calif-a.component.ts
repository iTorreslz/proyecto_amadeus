import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Nota } from '../../../../interfaces/Nota';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import { NotasService } from '../../../../services/notas-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-calif-a',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="flex flex-col gap-4 max-w-6xl m-auto">
    <div class="flex flex-col gap-2 items-center justify-center text-xl h-64" *ngIf="notas.length == 0">
      <p>Ninguna nota asignada aún.</p>
      <a [routerLink]="['/perfil_alumno']" class="mr-3 bg-blue-300 hover:bg-blue-400 transition-colors duration-700 p-2 rounded-xl">Volver</a>
    </div>
    <table class="mt-4 m-auto w-full" *ngIf="notas.length > 0">
      <thead>
        <tr class="uppercase">
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Nombre
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
              Calificación
          </th>
        </tr>
      </thead>
      <tbody *ngFor="let nota of notas">
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ nota.nombre }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
            {{ nota.calificacion }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styleUrl: './ver-calif-a.component.css'
})
export class VerCalifAComponent {
  alumno: Alumno | undefined;
  notas: Nota[] = [];

  constructor(
    private route: ActivatedRoute, private alumnosService: AlumnosService, private notasService: NotasService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let idAlumno = parseInt(this.route.snapshot.params['idAlumno']);

    this.alumnosService.getById(idAlumno).subscribe({
      next: (alumno: Alumno) => {
        this.alumno = alumno;
        this.notasService.getAll().subscribe({
          next: (notas: Nota[]) => {
            notas.forEach(nota => {
              if (nota.idAlumno == idAlumno) {
                this.notas.push(nota);
              }
            });
          }
        });
      }
    });
  }
}
