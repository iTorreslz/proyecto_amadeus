import { Component } from '@angular/core';

@Component({
  selector: 'app-alumnado-detalle',
  standalone: true,
  imports: [],
  template: `
  <div class="relative rounded-20 w-700 max-w-95 mx-auto bg-blue-100 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl font-bold text-navy-700">
          NOMBRE DEL ALUMNO
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-4 border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Código</p>
          <p class="text-base font-medium text-navy-700">Stanford University</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Nombre</p>
          <p class="text-base font-medium text-navy-700">English, Spanish, Italian</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Apellidos</p>
          <p class="text-base font-medium text-navy-700">Product Design</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Curso</p>
          <p class="text-base font-medium text-navy-700">English, Spanish, Italian</p>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
          <p class="text-sm text-gray-600">Instrumento</p>
          <p class="text-base font-medium text-navy-700">Simmmple Web LLC</p>
      </div>
    </div>
  </div>
  `,
  styleUrl: './alumnado-detalle.component.css'
})
export class AlumnadoDetalleComponent {

}
