import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { DragonService } from '../services/dragons.service';

@Component({
  selector: 'app-modalagrega',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modalagrega.component.html',
  styleUrls: ['./modalagrega.component.css']
})
export class ModalagregaComponent {
  newDragon = {
    nombre: '',
    descripcion: '',
    rareza: 'Común', // Valor predeterminado
    elemento: 'Fuego', // Valor predeterminado
    imagen: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalagregaComponent>,
    private dragonService: DragonService
  ) {}

  addDragon(): void {
    if (this.isFormValid()) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Se agregará un nuevo dragón.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, agregar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dragonService.addDragon(this.newDragon).subscribe({
            next: (createdDragon) => {
              this.dialogRef.close(createdDragon); // Devuelve el nuevo dragón al cerrar el modal
              Swal.fire("¡Éxito!", "El dragón fue agregado correctamente.", "success");
            },
            error: (err) => {
              Swal.fire("Error", err.message, "error");
            }
          });
        }
      });
    } else {
      Swal.fire("Error", "Por favor completa todos los campos requeridos.", "error");
    }
  }

  cancelAdd(): void {
    this.dialogRef.close(); // Cierra el modal sin realizar cambios
  }

  private isFormValid(): boolean {
    return !!(
      this.newDragon.nombre &&
      this.newDragon.descripcion &&
      this.newDragon.rareza &&
      this.newDragon.elemento
    );
  }
  
}
