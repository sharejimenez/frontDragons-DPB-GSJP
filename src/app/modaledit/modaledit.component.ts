import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { DragonService } from '../services/dragons.service';
@Component({
  selector: 'app-modaledit',
  standalone: true,
  imports: [FormsModule,],

  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css']
  
})
export class ModaleditComponent {
  constructor(
    public dialogRef: MatDialogRef<ModaleditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe el dragón a editar
    private dragonService: DragonService // Inyectar el servicio de dragones
  ) {}

  // Método para guardar los cambios
  saveChanges(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se guardarán los cambios realizados en este dragón.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dragonService.updateDragon(this.data).subscribe({
          next: () => {
            this.dialogRef.close(this.data); // Cierra el modal y devuelve los datos actualizados

            // Mensaje de éxito
            Swal.fire({
              title: "¡Éxito!",
              text: "Los cambios han sido guardados.",
              icon: "success"
            });
          },
          error: (err) => {
            Swal.fire({
              title: "Error",
              text: err.message,
              icon: "error"
            });
          }
        });
      }
    });
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.dialogRef.close(); // Solo cierra el modal sin guardar cambios
  }
}