import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmisionesService } from '../../../../services/admisiones.service';
import { NewAdmision } from '../../../../interfaces/newAdmision';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admisiones-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="relative rounded w-8/12 max-w-full mx-auto bg-blue-200 shadow-3xl p-3">
    <div class="mt-2 mb-8">
      <h4 class="text-3xl text-center font-bold text-navy-700">
        Solicitar admisión 
      </h4>
    </div>

    <p class="text-xl text-gray-600 text-center">Selecciona instrumento a solicitar</p>

    <div class="border border-gray-300 flex flex-row flex-wrap justify-between">
      <div class="rounded-2xl flex items-center text-4xl w-full h-32 bg-blue-800 px-3 py-4 shadow-3xl mt-4 mr-4" *ngFor="let instrumento of instrumentos">
        <input type="radio" class="text-base font-medium text-navy-700 w-14" name="instrumento" [value]="instrumento" [id]="instrumento" [(ngModel)]="selectedInstrumento"/>
        <label class="text-white" [for]="instrumento">{{ instrumento }}</label>
      </div>
    </div>
    <div class="flex justify-center">
      <button type="submit" (click)="enviar(this.idAlumnoSolicitante)"
        class="m-4 p-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
        Enviar solicitud
      </button>
    </div>
  </div>
  `,
  styleUrl: './admisiones-crear.component.css'
})
export class AdmisionesCrearComponent {
  idAlumnoSolicitante: number = 0;
  nuevaAdmision: NewAdmision = { idAlumno: 0, apto: false, noApto: false, instrumento: 0 };
  selectedInstrumento: string = "";
  instrumentos: string[] = ["Piano", "Guitarra", "Clarinete", "Saxofón", "Flauta", "Trompeta", "Bombardino", "Tuba", "Trombón", "Canto"]

  constructor(private admisionService: AdmisionesService, private router: Router) { }

  ngOnInit(): void {
    let usuarioString = localStorage.getItem("usuario");
    let usuario = usuarioString ? JSON.parse(usuarioString) : null;
    this.idAlumnoSolicitante = usuario ? usuario.id : 0;
  }

  getInstrumento(idInstrumento: number) {
    switch (idInstrumento) {
      case 1:
        this.selectedInstrumento = "Piano";
        break;
      case 2:
        this.selectedInstrumento = "Guitarra";
        break;
      case 3:
        this.selectedInstrumento = "Clarinete";
        break;
      case 4:
        this.selectedInstrumento = "Saxofón";
        break;
      case 5:
        this.selectedInstrumento = "Flauta";
        break;
      case 6:
        this.selectedInstrumento = "Trompeta";
        break;
      case 7:
        this.selectedInstrumento = "Bombardino";
        break;
      case 8:
        this.selectedInstrumento = "Tuba";
        break;
      case 9:
        this.selectedInstrumento = "Trombón";
        break;
      case 10:
        this.selectedInstrumento = "Canto";
        break;
      default:
        this.selectedInstrumento = "No asignado";
    }
  }

  enviar(idAlumno: number) {
    Swal.fire({
      title: "¿Está seguro de escoger este instrumento?",
      text: "Esta es una decisión muy importante. Si usted obtiene plaza, este será su instrumento durante toda la etapa académica.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, escoger instrumento",
      cancelButtonText: "Cancelar"
    }).then((result) => {

      if (result.isConfirmed) {
        this.nuevaAdmision.idAlumno = idAlumno;
        for (let i = 0; i < this.instrumentos.length; i++) {
          let instrumentoLoop: string = this.instrumentos[i];
          if (instrumentoLoop.includes(this.selectedInstrumento)) {
            this.nuevaAdmision.instrumento = i + 1;
          }
        }
        this.admisionService.create(this.nuevaAdmision).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Hecho!, su solicitud ha sido enviada",
              text: "Esto no quiere decir que ya tenga plaza para este instrumento. En menos de 48 horas laborables obtendrá una respuesta por parte del centro.",
              icon: "success"
            }).then(() => {
              this.router.navigate(['/perfil_alumno']);
            });
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }
}
