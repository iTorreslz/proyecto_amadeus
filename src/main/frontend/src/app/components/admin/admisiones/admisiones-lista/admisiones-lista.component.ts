import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Admision } from '../../../../interfaces/admision';
import { AdmisionesService } from '../../../../services/admisiones.service';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';

@Component({
  selector: 'app-admisiones-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <table class="m-auto w-full">
    <thead>
      <tr class="uppercase">
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Código
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Código Alumno
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Alumno
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Instrumento
        </th>
        <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left font-semibold text-blue-900 tracking-wider">
            Decisión
        </th>
        <th class="border-b-2 border-gray-200 bg-blue-100">
          <button class="" [routerLink]="['/admin/admisiones/nuevo']">
            <i class="fa-regular fa-square-plus text-3xl"></i>
          </button>
        </th>
      </tr>
    </thead>
    <tbody *ngFor="let admision of admisionesList">
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.id }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ admision.idAlumno }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ getNombreAlumno(admision.idAlumno) }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ getInstrumento(admision.instrumento) }}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-blue-900">
          {{ getDecision(admision.apto, admision.noApto) }}
        </td>
        <td class="border-b border-gray-200 bg-white text-blue-900 text-center">
          <button class="mr-3" (click)="admitir(admision)">
          <i class="fa-regular fa-circle-check"></i>
          </button>
          <button class="mr-3" (click)="denegar(admision)">
          <i class="fa-regular fa-circle-xmark"></i>
          </button>
          <button (click)="deleteAdmision(admision.id)">
              <i class="fa-solid fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styleUrl: './admisiones-lista.component.css'
})
export class AdmisionesListaComponent {
  decision: string = "";
  admisionesList: Admision[] = [];
  alumnos: Alumno[] = [];
  admision: Admision = {
    id: 0,
    idAlumno: 0,
    instrumento: 0,
    apto: false,
    noApto: false
  };

  constructor(private admisionService: AdmisionesService, private alumnoService: AlumnosService) { }

  ngOnInit() {
    this.admisionService.getAll().subscribe({
      next: (admisiones: Admision[]) => {
        this.admisionesList = admisiones;
      },
      error: (error) => {
        console.error('Error al obtener la lista de admisiones:', error);
      }
    });

    this.alumnoService.getAll().subscribe({
      next: (alumnos: Alumno[]) => {
        this.alumnos = alumnos;
      },
      error: (error) => {
        console.error('Error al obtener la lista de alumnos:', error);
      }
    });
  }

  getNombreAlumno(idAlumno: number): any {
    for (let alumno of this.alumnos) {
      if (alumno.id === idAlumno) {
        return alumno.nombre + " " + alumno.apellidos;
      }
    }
  }

  getInstrumento(idInstrumento: number): string {
    switch (idInstrumento) {
      case 1:
        return "Piano";
        break;
      case 2:
        return "Guitarra";
        break;
      case 3:
        return "Clarinete";
        break;
      case 4:
        return "Saxofón";
        break;
      case 5:
        return "Flauta";
        break;
      case 6:
        return "Trompeta";
        break;
      case 7:
        return "Bombardino";
        break;
      case 8:
        return "Tuba";
        break;
      case 9:
        return "Trombón";
        break;
      case 10:
        return "Canto";
        break;
      default:
        return "No asignado";
    }
  }

  getDecision(apto: boolean, noApto: boolean) {
    if (apto === false && noApto === false) {
      return "Aún no gestionado"
    } else if (apto === true && noApto === false) {
      return "Admitido";
    } else if (apto === false && noApto === true) {
      return "No admitido";
    } else {
      return "Error";
    }
  }

  admitir(admision: Admision) {
    admision.apto = true;
    this.admisionService.update(admision, admision.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  denegar(admision: Admision) {
    admision.noApto = true;
    this.admisionService.update(admision, admision.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteAdmision(id: number) {
    this.admisionService.delete(id).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: () => {
        console.error('Error al eliminar admisión con código ' + id);
      }
    });
  }
}
