import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmisionesService } from '../../../services/admisiones.service';
import { NewAdmision } from '../../../interfaces/newAdmision';

@Component({
  selector: 'app-admisiones-crear',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="relative rounded w-700 max-w-95 mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-3xl text-center font-bold text-navy-700">
        Solicitar admisión 
      </h4>
    </div>

    <p class="text-xl text-gray-600 text-center">Selecciona instrumento a solicitar</p>

    <div class="border border-gray-300 flex flex-row flex-wrap justify-between">
      <div class="rounded-2xl bg-blue-800 px-3 py-4 shadow-3xl mt-4 mr-4" *ngFor="let instrumento of instrumentos">
        <input type="radio" class="text-base font-medium text-navy-700 w-14" name="instrumento" [id]="instrumento"/>
        <label class="text-white" [for]="instrumento">{{ instrumento }}</label>
      </div>
    </div>

    <div class="flex justify-center">
      <button type="submit" (click)="this.guardarCambios(this.idAlumnoSolicitante, 0)"
        class="m-4 p-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './admisiones-crear.component.css'
})
export class AdmisionesCrearComponent {
  idAlumnoSolicitante: number = 0;
  nuevaAdmision: NewAdmision = { idAlumno: 0, apto: false, noApto: false, instrumento: 0 };
  instrumento: string = "";
  instrumentos: string[] = ["Piano", "Guitarra", "Clarinete", "Saxofón", "Flauta", "Trompeta", "Bombardino", "Tuba", "Trombón", "Canto"]

  constructor(private admisionService: AdmisionesService) { }

  ngOnInit(): void {
    let usuarioString = localStorage.getItem("usuario");
    let usuario = usuarioString ? JSON.parse(usuarioString) : null;
    this.idAlumnoSolicitante = usuario ? usuario.id : 0;
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

  guardarCambios(idAlumno: number, instrumento: number) {
    this.nuevaAdmision.idAlumno = idAlumno;
    this.nuevaAdmision.instrumento = instrumento;
    this.admisionService.create(this.nuevaAdmision).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
