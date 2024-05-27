import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-descripcion-tareas',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
  <div class="p-10">
    <p>{{description}}</p>
  </div>
  `,
  styleUrl: './descripcion-tareas.component.css'
})
export class DescripcionTareasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<DescripcionTareasComponent>
  ) { }

  description: string = this.data.descripcion;

  close() {
    this.dialog.close();
  }
}
