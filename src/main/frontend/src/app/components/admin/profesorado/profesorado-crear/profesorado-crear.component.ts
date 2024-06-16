import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../../../services/profesores.service';
import { NewProfesor } from '../../../../interfaces/newProfesor';
import Swal from 'sweetalert2';
import { Profesor } from '../../../../interfaces/profesor';
import { Instrumento } from '../../../../interfaces/instrumento';
import { InstrumentosService } from '../../../../services/instrumentos-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesorado-crear',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="relative rounded w-1/2 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Añadir un profesor nuevo
      </h4>
    </div>
    <div class="flex flex-col gap-4 border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Email</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" name="email"
          #email>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Password</label>
        <input type="password" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" name="password"
          #password>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Nombre</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" name="nombre"
          #nombre>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Apellidos</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" name="apellidos"
          #apellidos>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl mt-4 flex flex-col items-center">
        <label for="instrumento" class="block text-sm font-medium text-gray-700">Instrumento</label>
        <select id="instrumento" class="mt-1 block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          #instrumento>
          <option *ngFor="let instrumento of instrumentos" [value]="instrumento.id">
            {{ instrumento.nombre }}
          </option>
        </select>
      </div>
      <button type="submit" (click)="this.guardarCambios(email.value,password.value,nombre.value,apellidos.value,instrumento.value)"
        class="m-auto p-2 w-fit bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './profesorado-crear.component.css'
})
export class ProfesoradoCrearComponent {
  profesor: NewProfesor = { email: '', password: '', nombre: '', apellidos: '', idInstrumento: 0 };
  profesores: Profesor[] = [];
  instrumento: string = "";
  instrumentos: Instrumento[] = [];

  constructor(private route: ActivatedRoute, private profesoresService: ProfesoresService, private router: Router, private instService: InstrumentosService) { }

  ngOnInit() {
    this.profesoresService.getAll().subscribe({
      next: (profesores) => {
        this.profesores = profesores;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.instService.getAll().subscribe({
      next: (instrumentos) => {
        this.instrumentos = instrumentos;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  guardarCambios(email: string, password: string, nombre: string, apellidos: string, instrumento: string) {
    this.profesor.email = email;
    this.profesor.password = password;
    this.profesor.nombre = nombre;
    this.profesor.apellidos = apellidos;
    this.profesor.idInstrumento = parseInt(instrumento);

    let yaExiste: boolean = false;

    this.profesores.forEach(profesor => {
      if (profesor.email === this.profesor.email) {
        Swal.fire({
          title: "Error",
          text: "Ya existe este profesor. Email " + profesor.email + " ya registrado.",
          icon: "error"
        });
        yaExiste = true;
      }
    });

    if (!yaExiste) {
      this.profesoresService.create(this.profesor).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Hecho!",
            text: nombre + " " + apellidos + " ya puede iniciar sesión con sus credenciales de acceso.",
            showConfirmButton: false,
            timer: 2500,
            icon: "success"
          }).then(() => {
            this.router.navigate(['/admin/profesorado']);
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
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
