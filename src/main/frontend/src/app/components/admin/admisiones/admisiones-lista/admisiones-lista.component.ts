import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Admision } from '../../../../interfaces/admision';
import { AdmisionesService } from '../../../../services/admisiones.service';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "¿Está seguro de admitir a este alumno?",
      text: "El alumno formará parte de la escuela a partir de este momento.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, admitir"
    }).then((result) => {

      if (result.isConfirmed) {

        admision.apto = true;

        this.admisionService.update(admision, admision.id).subscribe({
          next: () => { },
          error: (error) => {
            console.error(error);
          }
        });

        Swal.fire({
          title: "¡Hecho!",
          text: "El alumno ya pertenece a la escuela. Ahora tendrá que proceder a asignarle un horario adecuado.",
          showConfirmButton: false,
          timer: 3250,
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  denegar(admision: Admision) {
    Swal.fire({
      title: "¿Está seguro de denegar la solicitud de este alumno?",
      text: "El alumno no podrá formar parte de la escuela.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, denegar solicitud"
    }).then((result) => {

      if (result.isConfirmed) {

        admision.noApto = true;

        this.admisionService.update(admision, admision.id).subscribe({
          next: () => { },
          error: (error) => {
            console.error(error);
          }
        });

        Swal.fire({
          title: "¡Hecho!",
          text: "Esta solicitud ha sido denegada correctamente.",
          showConfirmButton: false,
          timer: 2500,
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  deleteAdmision(id: number) {
    Swal.fire({
      title: "¿Está seguro de borrar esta admisión?",
      text: "No se denegará ni se aceptará, sino que se borrará de la base de datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {

      if (result.isConfirmed) {

        this.admisionService.delete(id).subscribe({
          next: () => { },
          error: () => {
            console.error('Error al eliminar la admisión con código ' + id);
          }
        });

        Swal.fire({
          title: "¡Hecho!",
          text: "Esta admisión ha sido eliminada.",
          showConfirmButton: false,
          timer: 1700,
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  getInstrumento(idInstrumento: number): string {
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
