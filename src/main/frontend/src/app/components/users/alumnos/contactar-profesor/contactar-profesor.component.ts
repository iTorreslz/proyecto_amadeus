import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactar-profesor',
  standalone: true,
  imports: [MatDialogModule],
  template: `
  <div class="flex flex-wrap lg:justify-between m-auto max-w-screen-xl mt-4 mb-4">
    <div class="px-4" style="width: 500px;">
      <div class="bg-blue-100 relative rounded-xl p-8 sm:p-12 shadow-lg">
        <form>
          <div class="mb-6">
              <input type="text" placeholder="Asunto" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary" />
          </div>
          <div class="mb-6">
              <textarea rows="6" placeholder="Tu mensaje" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary"></textarea>
          </div>
          <div>
              <button type="button" (click)="onClick()" class="w-full text-white bg-blue-700 rounded border border-primary p-3 transition hover:bg-opacity-90">Envía tu mensaje</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  styleUrl: './contactar-profesor.component.css'
})
export class ContactarProfesorComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<ContactarProfesorComponent>
  ) { }

  onClick() {
    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Pronto tendrá una respuesta de su profesor.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      this.close();
    });
  }
  
  close() {
    this.dialog.close();
  }
}
