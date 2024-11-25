import { Component, Inject,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modaleliminar',
  standalone: true,
  imports: [],
  templateUrl: './modaleliminar.component.html',
  styleUrl: './modaleliminar.component.css'
})
export class ModaleliminarComponent {
  constructor(
    public dialogRef: MatDialogRef<ModaleliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe el Pokémon a eliminar
  ) {}

  // Confirmar la eliminación
  confirmDelete(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar el Pokémon
        // Por ejemplo, llamando a un servicio para eliminarlo de la base de datos

        this.dialogRef.close(true); // Devuelve true para confirmar la eliminación

        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu Pokémon ha sido eliminado.",
          icon: "success"
        });
      }
    });
  
  }

  // Cancelar la eliminación
  cancelDelete(): void {
    this.dialogRef.close(false); // Devuelve false para cancelar
  }
}
