import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../../../services/profesores.service';
import { NewProfesor } from '../../../../interfaces/newProfesor';

@Component({
  selector: 'app-profesorado-crear',
  standalone: true,
  imports: [],
  template: `
  <div class="relative rounded w-700 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Añadir un profesor nuevo
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-4 border border-gray-300">
    <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Email</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="email"
          #email>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Password</label>
        <input type="password" class="text-base font-medium text-navy-700 w-48" name="password"
          #password>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Nombre</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="nombre"
          #nombre>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Apellidos</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="apellidos"
          #apellidos>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Instrumento</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="instrumento"
        #instrumento>
      </div>
      <button type="submit" (click)="this.guardarCambios(email.value,password.value,nombre.value,apellidos.value,instrumento.value)"
        class="m-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './profesorado-crear.component.css'
})
export class ProfesoradoCrearComponent {
  profesor: NewProfesor = { email: '', password: '', nombre: '', apellidos: '', idInstrumento: 0 };
  instrumento: string = "";

  constructor(private route: ActivatedRoute, private profesoresService: ProfesoresService, private router: Router) { }

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

  guardarCambios(email: string, password: string, nombre: string, apellidos: string, instrumento: string) {
    this.profesor.email = email;
    this.profesor.password = password;
    this.profesor.nombre = nombre;
    this.profesor.apellidos = apellidos;
    this.profesor.idInstrumento = parseInt(instrumento);
    this.profesoresService.create(this.profesor).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
