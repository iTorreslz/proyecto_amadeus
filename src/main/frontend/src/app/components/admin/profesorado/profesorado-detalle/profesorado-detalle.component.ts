import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';

@Component({
  selector: 'app-profesorado-detalle',
  standalone: true,
  imports: [],
  template: `
  <div class="relative rounded w-700 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      {{ profesor?.nombre?.toUpperCase() }} {{ profesor?.apellidos?.toUpperCase() }}
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-4 border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Nombre</p>
          <p class="text-base font-medium text-navy-700">{{ profesor?.nombre }}</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Apellidos</p>
          <p class="text-base font-medium text-navy-700">{{ profesor?.apellidos }}</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Código</p>
          <p class="text-base font-medium text-navy-700">{{ profesor?.id }}</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Instrumento</p>
          <p class="text-base font-medium text-navy-700">{{ this.instrumento }}</p>
      </div>
    </div>
  </div>
  `,
  styleUrl: './profesorado-detalle.component.css'
})
export class ProfesoradoDetalleComponent {

  profesor: Profesor | undefined;
  instrumento: string = "";

  constructor(private route: ActivatedRoute, private profesoresService: ProfesoresService) { }

  ngOnInit(): void {
    let idProfesor = parseInt(this.route.snapshot.params['id']);
    this.profesoresService.getById(idProfesor).subscribe({
      next: (profesor: Profesor) => {
        this.profesor = profesor;
        this.getInstrumento(profesor.idInstrumento);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

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
}
