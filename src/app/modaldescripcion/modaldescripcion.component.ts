import { CommonModule } from '@angular/common';
import { Component, Inject , ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; // Importa el módulo de MatDialog

import { MatButtonModule } from '@angular/material/button';
import { PokemonComponent } from '../pokemon/pokemon.component';
@Component({
  selector: 'app-modaldescripcion',
  standalone: true,
  imports: [MatDialogModule,CommonModule, MatButtonModule],
  templateUrl: './modaldescripcion.component.html',
  styleUrl: './modaldescripcion.component.css'
})
export class ModaldescripcionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModaldescripcionComponent> // Inyectamos el servicio MatDialogRef
  ) {}

  close(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}
