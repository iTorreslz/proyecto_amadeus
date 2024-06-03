import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAudicion } from '../../../../interfaces/newAudicion';
import { AudicionesService } from '../../../../services/audiciones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Audicion } from '../../../../interfaces/audicion';

@Component({
  selector: 'app-audiciones-crear',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="flex flex-col items-center rounded w-5/6 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Publicar nueva audición
      </h4>
    </div>
    <div class="flex flex-col items-center w-1/2 border border-gray-300">
      <div class="border border-gray-300 p-4 w-72 text-center rounded-md">
        <label for="instrumento" class="block text-sm font-medium text-gray-700">Selecciona un Instrumento</label>
        <select id="instrumento" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          #instrumento>
          <option *ngFor="let instrumento of instrumentos" [value]="instrumento">{{ instrumento }}</option>
        </select>
      </div>
      <div class="rounded bg-white px-4 py-4 text-center">
        <label class="text-sm text-gray-600">Fecha</label>
        <input type="date" class="text-base font-medium text-navy-700 w-48" name="fecha"
          #fecha>
      </div>
      <div class="rounded w-fit bg-white px-4 py-4 mt-4 text-center">
        <label class="text-sm text-gray-600">Hora</label>
        <input type="time" class="text-base font-medium text-navy-700 w-48" name="hora"
          #hora>
      </div>
      <button type="submit" (click)="this.publicarAudicion(instrumento.value,fecha.value,hora.value)"
        class="bg-blue-800 p-2 w-fit mt-4 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './audiciones-crear.component.css'
})
export class AudicionesCrearComponent {
  audicion: NewAudicion = { idInstrumento: 0, diaHoraString: "" };
  audiciones: Audicion[] = [];
  fechaHora: string = "";
  instrumento: string = "";
  idInstrumento: number = 0;
  instrumentos: string[] = ["Piano", "Guitarra", "Clarinete", "Saxofón", "Flauta", "Trompeta", "Bombardino", "Tuba", "Trombón", "Canto"]

  ngOnInit(): void {
    this.audicionesService.getAll().subscribe(audiciones => {
      this.audiciones = audiciones;
    });
  }

  constructor(private audicionesService: AudicionesService, private router: Router) { }

  getInstrumento(idInstrumento: number) {
    switch (idInstrumento) {
      case 1:
        this.instrumento = "Piano";
        break;
      case 2:
        this.instrumento = "Guitarra";
        break;
      case 3:
        this.instrumento = "Clarinete";
        break;
      case 4:
        this.instrumento = "Saxofón";
        break;
      case 5:
        this.instrumento = "Flauta";
        break;
      case 6:
        this.instrumento = "Trompeta";
        break;
      case 7:
        this.instrumento = "Bombardino";
        break;
      case 8:
        this.instrumento = "Tuba";
        break;
      case 9:
        this.instrumento = "Trombón";
        break;
      case 10:
        this.instrumento = "Canto";
        break;
      default:
        this.instrumento = "No asignado";
    }
  }

  comparadorFechas(dateString1: string, dateString2: string) {
    let date1 = dateString1.split(' ')[0];
    let date2 = dateString2.split(' ')[0];
    return date1 === date2;
  }

  publicarAudicion(instrumento: string, fecha: string, hora: string) {

    let fechaSplitted: string[] = fecha.split('-');
    fecha = `${fechaSplitted[2]}/${fechaSplitted[1]}/${fechaSplitted[0]}`;
    this.fechaHora = fecha + " " + hora;

    for (let i = 0; i < this.instrumentos.length; i++) {
      if (this.instrumentos[i].includes(instrumento)) {
        this.idInstrumento = i + 1;
      }
    }

    this.audicion.diaHoraString = this.fechaHora;
    this.audicion.idInstrumento = this.idInstrumento;
    let fechasCoincidentes: boolean = false;

    if (this.audiciones.length > 0) {
      this.audiciones.forEach(audicion => {
        let fechaSplittedBD1: string[] = audicion.diaHora.split('T');
        let fechaSplittedBD2: string[] = fechaSplittedBD1[0].split('-');
        let fechaDia = `${fechaSplittedBD2[2]}/${fechaSplittedBD2[1]}/${fechaSplittedBD2[0]}`;
        if (this.comparadorFechas(fechaDia, this.audicion.diaHoraString)) {
          Swal.fire({
            title: "Error",
            text: "Ya existe una audición para el día " + fecha + " a las " + hora + ". No puede haber dos audiciones del mismo instrumento un mismo día.",
            icon: "error"
          });
          fechasCoincidentes = true;
        }
      });
    }

    if (!fechasCoincidentes) {
      this.audicionesService.create(this.audicion).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Hecho!",
            text: "Se ha creado una nueva audición para el día " + fecha + " a las " + hora + ".",
            showConfirmButton: false,
            timer: 2300,
            icon: "success"
          }).then(() => {
            this.router.navigate(['/admin/audiciones']);
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
