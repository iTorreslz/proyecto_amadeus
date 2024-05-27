import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajustes-perfil-profesor',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
  template: `
  <div class="rounded w-700 max-w-95 mx-auto bg-blue-200 shadow-3xl p-10">
    <div class="mt-2 mb-8">
      <h4 class="text-xl text-center font-bold text-navy-700">
        Ajustes de perfil
      </h4>
    </div>
    <div class="flex flex-col  border border-gray-300">
      <div class="flex flex-col rounded-2xl bg-white px-3 py-4 shadow-3xl">
        <p class="text-sm text-gray-600 mb-4">¿Desea cambiar la contraseña?</p>
        <label class="text-sm text-gray-600">Contraseña actual</label>
        <input type="password" class="text-base font-medium text-navy-700 w-48" name="lastPasswd"
          #lastPasswd>
        <label class="text-sm text-gray-600">Nueva contraseña</label>
        <input type="password" class="text-base font-medium text-navy-700 w-48" name="newPasswd"
          #newPasswd>
      </div>
      <button type="submit" (click)="this.guardarCambios(lastPasswd.value,newPasswd.value)"
        class="m-4 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 p-2">
        Guardar cambios
      </button>
    </div>
  </div>
  `,
  styleUrl: './ajustes-perfil-profesor.component.css'
})
export class AjustesPerfilProfesorComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string, private dialog: MatDialogRef<AjustesPerfilProfesorComponent>
  ) { }

  lastPasswd: string = this.data;
  newPasswd: string = "";

  guardarCambios(lastPasswd: string, newPasswd: string) {
    if (lastPasswd === this.lastPasswd) {
      this.newPasswd = newPasswd;
      this.dialog.close(this.newPasswd);
    } else {
      console.log("Error introduciendo contraseña actual.");
      
    }
  }
}
