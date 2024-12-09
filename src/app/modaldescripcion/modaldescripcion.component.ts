import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { DragonService } from '../services/dragons.service';
@Component({
  selector: 'app-modaledit',
  standalone: true,
  imports: [FormsModule,],

  templateUrl: './modaldescripcion.component.html',
  styleUrls: ['./modaldescripcion.component.css']
  
})
export class ModaldescripcionComponent {
  constructor(
    public dialogRef: MatDialogRef<ModaldescripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe el dragón a editar
    private dragonService: DragonService // Inyectar el servicio de dragones
  ) {}
  close(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}
