import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Audicion } from '../../interfaces/audicion';
import { AudicionesService } from '../../services/audiciones.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="w-full mx-auto px-4">
    <div *ngIf="audiciones.length > 0" class="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
      <div class="flex flex-col items-center w-full max-w-7xl mx-auto">
        <div class="-my-6">
          <div *ngFor="let audicion of audiciones" class="relative pl-8 sm:pl-32 py-6 group">
            <div class="font-medium text-indigo-500 mb-1 sm:mb-0">
              Audición
            </div>
            <div class="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2
              sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2
              before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4
              after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time class="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6
                mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                {{ formatDate(audicion.diaHora) }}
              </time>
              <div class="text-xl font-bold text-slate-900">
                Audiciones de los alumnos de <span class="text-blue-800">{{getInstrumento(audicion.idInstrumento)}}</span>
              </div>
              <div class="text-slate-500">
                "¡Disfruta de la música en vivo! Te invitamos a nuestra audición de <span class="text-blue-800 font-bold lowercase">
                  {{getInstrumento(audicion.idInstrumento)}}
                </span>, donde nuestros talentosos alumnos mostrarán su destreza musical."
              </div>
            </div>
          </div>
        </div>
        <img src="../../../assets/images/orquestra.jpg" class="h-full w-11/12 object-contain mt-12 mb-6 rounded-lg" alt="">
      </div>
    </div>
    <div *ngIf="audiciones.length == 0" class="flex flex-col items-center">
      <p class="text-xl mt-16">No hay audiciones disponibles en este momento. Pronto se organizarán y aparecerán en este apartado.</p>
      <img src="../../../assets/images/orquestra.jpg" class="h-full w-8/12 object-contain mt-8 mb-6 rounded-lg" alt="">
    </div>
  </div>
  `,
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  audiciones: Audicion[] = [];

  constructor(private audicionesService: AudicionesService) { }

  ngOnInit() {
    this.audicionesService.getAll().subscribe({
      next: (audiciones: Audicion[]) => {
        this.audiciones = audiciones;
      },
      error: (error) => {
        console.error('Error al obtener la lista de audiciones:', error);
      }
    });
  }

  formatDate(fecha: string): string {
    let date = new Date(fecha);
    let day = ('0' + date.getDate()).slice(-2);
    let month = date.toLocaleString('default', { month: 'short' });
    let time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    return `${day} ${month} | ${time}`;
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
