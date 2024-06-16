import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../../../interfaces/alumno';
import { AlumnosService } from '../../../../services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnado-editar',
  standalone: true,
  imports: [],
  template: `
  <div class="relative rounded w-1/2 m-auto max-w-95 bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
      Editar datos de {{alumno?.nombre?.toUpperCase()}} {{alumno?.apellidos?.toUpperCase()}}
      </h4>
    </div>
    <div class="flex flex-col gap-4 border border-gray-300">
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Nombre</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" name="nombre" value="{{alumno?.nombre}}"
          #nombre>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Apellidos</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" name="apellidos" value="{{alumno?.apellidos}}"
          #apellidos>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Código</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" value="{{alumno?.id}}" readonly>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Curso</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" value="{{alumno?.curso}}" name="curso"
          #curso>
      </div>
      <div class="rounded-2xl bg-white px-3 py-4 shadow-3xl flex flex-col items-center">
        <label class="text-sm text-gray-600 mb-1">Instrumento</label>
        <input type="text" class="text-base font-medium text-navy-700 w-48 border rounded border-gray-300 p-1 text-center" value="{{this.instrumento}}" name="instrumento"
        readonly>
      </div>
      <button type="submit" (click)="this.guardarCambios(nombre.value,apellidos.value,curso.value)"
        class="m-auto p-2 w-fit bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './alumnado-editar.component.css'
})
export class AlumnadoEditarComponent {
  alumno: Alumno | undefined;
  instrumento: string = "";

  constructor(private route: ActivatedRoute, private alumnosService: AlumnosService, private router: Router) { }

  ngOnInit(): void {
    let idAlumno = parseInt(this.route.snapshot.params['id']);
    this.alumnosService.getById(idAlumno).subscribe({
      next: (alumno: Alumno) => {
        this.alumno = alumno;
        this.getInstrumento(alumno.idInstrumento);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  guardarCambios(nombre: string, apellidos: string, curso: string) {
    if (this.alumno) {
      this.alumno.nombre = nombre;
      this.alumno.apellidos = apellidos;
      this.alumno.curso = parseInt(curso);
      this.alumnosService.update(this.alumno, this.alumno.id).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Hecho!",
            text: "Cambios guardados.",
            showConfirmButton: false,
            timer: 1500,
            icon: "success"
          }).then(() => {
            this.router.navigate(['/admin/alumnado']);
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
