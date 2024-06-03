import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from '../../../../interfaces/profesor';
import { ProfesoresService } from '../../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesorado-editar',
  standalone: true,
  imports: [],
  template: `
  <div class="relative rounded w-700 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Editar datos de {{profesor?.nombre?.toUpperCase()}} {{profesor?.apellidos?.toUpperCase()}}
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-4 border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Nombre</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="nombre" value="{{profesor?.nombre}}"
          #nombre>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Apellidos</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" name="apellidos" value="{{profesor?.apellidos}}"
          #apellidos>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Código</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" value="{{profesor?.id}}" readonly>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <label class="text-sm text-gray-600">Instrumento</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48" value="{{this.instrumento}}" name="instrumento"
        readonly>
      </div>
      <button type="submit" (click)="this.guardarCambios(nombre.value,apellidos.value)"
        class="m-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './profesorado-editar.component.css'
})
export class ProfesoradoEditarComponent {
  profesor: Profesor | undefined;
  instrumento: string = "";

  constructor(private route: ActivatedRoute, private profesoresService: ProfesoresService, private router: Router) { }

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

  guardarCambios(nombre: string, apellidos: string) {
    if (this.profesor) {
      this.profesor.nombre = nombre;
      this.profesor.apellidos = apellidos;
      this.profesoresService.update(this.profesor, this.profesor.id).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Hecho!",
            text: "Cambios guardados.",
            showConfirmButton: false,
            timer: 1500,
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
