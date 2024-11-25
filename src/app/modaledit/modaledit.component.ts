import { Component,Inject,ViewEncapsulation  } from '@angular/core';
'@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokemonService } from '../services/pokemon.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modaledit',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './modaledit.component.html',
  styleUrl: './modaledit.component.css'
})
export class ModaleditComponent {
  constructor(
    public dialogRef: MatDialogRef<ModaleditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe el Pokémon a editar

  ) {}

  // Método para guardar los cambios
  saveChanges(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se guardarán los cambios realizados en este Pokémon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(this.data); // Cierra el modal y devuelve los datos actualizados

        // Mensaje de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: "Los cambios han sido guardados.",
          icon: "success"
        });
      }
    });
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.dialogRef.close(); // Solo cierra el modal sin guardar cambios
  }
}
