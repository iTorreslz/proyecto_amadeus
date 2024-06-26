import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmisionesService } from '../../../../services/admisiones.service';
import { NewAdmision } from '../../../../interfaces/newAdmision';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Admision } from '../../../../interfaces/admision';

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

    <p class="text-xl text-gray-600 text-center mb-4">Selecciona instrumento a solicitar</p>

    <div class="border border-gray-300 flex flex-row flex-wrap justify-around mb-2">
      <div class="rounded-xl flex items-center text-xl w-1/3 px-3 py-4 shadow-3xl mt-4 mr-4 transition-colors duration-700" *ngFor="let instrumento of instrumentos"
      [ngClass]="{'bg-blue-800': selectedInstrumento !== instrumento, 'bg-blue-500': selectedInstrumento === instrumento}">
        <input type="radio" class="text-base font-medium text-navy-700 w-14" name="instrumento" [value]="instrumento" [id]="instrumento" [(ngModel)]="selectedInstrumento"/>
        <label class="transition-colors duration-700" [for]="instrumento" [ngClass]="{'text-white': selectedInstrumento !== instrumento, 'text-black': selectedInstrumento === instrumento}">{{ instrumento }}</label>
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
  nuevaAdmision: NewAdmision | undefined;
  selectedInstrumento: string = "";
  instrumentos: string[] = ["Piano", "Guitarra", "Clarinete", "Saxofón", "Flauta", "Trompeta", "Bombardino", "Tuba", "Trombón", "Canto"]
  admisiones: Admision[] = [];

  constructor(private admisionService: AdmisionesService, private router: Router) { }

  ngOnInit(): void {
    let usuarioString = localStorage.getItem("usuario");
    let usuario = usuarioString ? JSON.parse(usuarioString) : null;
    this.idAlumnoSolicitante = usuario ? usuario.id : 0;

    this.admisionService.getAll().subscribe({
      next: (admisiones: Admision[]) => {
        admisiones.forEach(admision => {
          if (admision.idAlumno == this.idAlumnoSolicitante) {
            this.admisiones.push(admision);
          }
        })
      },
      error: (error) => {
        console.error('Error al obtener la lista de admisiones:', error);
      }
    });
  }

  enviar(idAlumno: number) {

    if (this.selectedInstrumento === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Error: instrumento no seleccionado',
        text: 'Tiene que seleccionar un instrumento antes de enviar la solicitud.',
      })
    } else {
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

        let yaSolicitado: boolean = false;

        if (result.isConfirmed) {
          for (let i = 0; i < this.instrumentos.length; i++) {

            this.admisiones.forEach(admision => {
              if (admision.instrumento == i + 1) {
                yaSolicitado = true;
              }
            });

            if (yaSolicitado) {
              Swal.fire({
                icon: 'warning',
                title: 'Instrumento ya solicitado. Seleccione otro si lo desea.',
                text: 'Tiene que esperar a la respuesta por parte de la escuela. Cualquier duda contacte con la misma.',
              })

              yaSolicitado = false;
              
            } else {
              let instrumentoLoop: string = this.instrumentos[i];
              if (instrumentoLoop.includes(this.selectedInstrumento)) {
                this.nuevaAdmision = {
                  idAlumno: idAlumno,
                  apto: false,
                  noApto: false,
                  instrumento: i + 1
                };
              }
            }
          }
          this.admisionService.create(this.nuevaAdmision!).subscribe({
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
}
