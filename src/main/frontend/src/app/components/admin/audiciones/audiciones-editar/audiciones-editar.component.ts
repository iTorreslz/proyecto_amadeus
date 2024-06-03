import { Component } from '@angular/core';
import { Audicion } from '../../../../interfaces/audicion';
import { ActivatedRoute, Router } from '@angular/router';
import { AudicionesService } from '../../../../services/audiciones.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { NewAudicion } from '../../../../interfaces/newAudicion';

@Component({
  selector: 'app-audiciones-editar',
  standalone: true,
  imports: [],
  template: `
  <div class="relative rounded w-700 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Editar datos de audición con código {{audicion!.id}}
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-4 border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Código</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" readonly name="codigo" value="{{audicion!.id}}">
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Instrumento</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="idInstrumento" value="{{audicion!.idInstrumento}}"
          #instrumento>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Fecha</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="fecha" value="{{formatDate(audicion!.diaHora)}}"
          #fecha>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Hora</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="hora" value="{{formatTime(audicion!.diaHora)}}"
          #hora>
      </div>
      <button type="submit" (click)="this.guardarCambios(instrumento.value,fecha.value,hora.value)"
        class="m-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './audiciones-editar.component.css'
})
export class AudicionesEditarComponent {

  constructor(private route: ActivatedRoute, private audicionesService: AudicionesService, private router: Router) { }

  audicion: Audicion | undefined;
  editedAudicion: NewAudicion | undefined;

  ngOnInit(): void {
    let idAudicion = parseInt(this.route.snapshot.params['id']);
    this.audicionesService.getById(idAudicion).subscribe({
      next: (audicion: Audicion) => {
        this.audicion = audicion;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  guardarCambios(idInstrumento: string, fecha: string, hora: string) {
    if (this.audicion) {
      let fechaSplitted: string[] = fecha.split('-');
      fecha = `${fechaSplitted[2]}/${fechaSplitted[1]}/${fechaSplitted[0]}`;

      this.editedAudicion = {
        idInstrumento: parseInt(idInstrumento),
        diaHoraString: fecha + " " + hora
      };

      this.audicionesService.update(this.editedAudicion, this.audicion.id).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Hecho!",
            text: "Cambios guardados.",
            showConfirmButton: false,
            timer: 1500,
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

  formatDate(date: string): string {
    return date.slice(0, 10);
  }

  formatTime(date: string): string {
    return date.slice(11, 16);
  }
}
