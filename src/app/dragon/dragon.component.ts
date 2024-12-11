import { Component, OnInit, inject } from '@angular/core';
import { CommonModule,NgFor, NgIf} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DragonService } from '../services/dragons.service';
import { Dragons } from '../models/dragons';
import { ModaldescripcionComponent } from '../modaldescripcion/modaldescripcion.component';
import { ModalagregaComponent } from '../modalagrega/modalagrega.component';
import { ModaleditComponent } from '../modaledit/modaledit.component';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any; // Declarar bootstrap para evitar errores de TypeScript
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

@Component({
  selector: 'app-dragons',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,NgFor, NgIf,
    MatInputModule,NgxPaginationModule,
    MatButtonModule,
    MatIconModule,    FormsModule 

  ],
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.css']
})
export class DragonsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'imagen', 'nombre', 'rareza', 'elemento', 'acciones'];
  dataSource: Dragons[] = [];
  originalDataSource: Dragons[] = [];
  searchTerm: string = '';
  filteredDragons = [...this.dataSource]; // Inicializa con todos los dragones
  page: number = 1; // Current page number
  pageSize: number = 5;

  private dragonService = inject(DragonService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadDragons();
  }

  loadDragons(): void {
    this.dragonService.getDragons().subscribe((data) => {
      this.originalDataSource = data;
      this.dataSource = [...this.originalDataSource];
    });
  }

 filterDragons(): void {
  this.dataSource = this.searchTerm
    ? this.originalDataSource.filter((dragon) =>
        dragon.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    : [...this.originalDataSource];
}applyFilter(): void {
  const term = this.searchTerm.toLowerCase();
  const filterValue = this.searchTerm.toLowerCase();
  this.dataSource = this.originalDataSource.filter(dragon => 
    

    dragon.nombre.toLowerCase().includes(filterValue) ||
    dragon.rareza.toLowerCase().includes(filterValue) ||
    dragon.elemento.toLowerCase().includes(filterValue)
  );
  // Si no hay término de búsqueda, muestra todos los dragones
  if (!term.trim()) {
    this.filteredDragons = [...this.dataSource];
    return;
  }

  // Filtra los dragones según el término ingresado
  this.filteredDragons = this.dataSource.filter(dragon =>
    dragon.nombre.toLowerCase().includes(term) ||
    dragon.rareza.toLowerCase().includes(term) ||
    dragon.elemento.toLowerCase().includes(term)
  );
}

deleteDragon(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás recuperar este dragón después de eliminarlo!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dragonService.deleteDragon(id).subscribe(() => {
        this.dataSource = this.dataSource.filter((dragon) => dragon.id !== id);
        Swal.fire(
          'Eliminado!',
          'El dragón ha sido eliminado.',
          'success'
        );
      }, error => {
        Swal.fire(
          'Error!',
          'Hubo un problema al eliminar el dragón.',
          'error'
        );
      });
    }
  });
}

  openAddModal(): void {
      const dialogRef = this.dialog.open(ModalagregaComponent, {
        panelClass: 'custom-modal-class' // Clase personalizada
    });

    dialogRef.afterClosed().subscribe((newDragon) => {
        if (newDragon) {
            this.dataSource = [...this.dataSource, newDragon];
            this.loadDragons();
        }
    });
}

  
  viewInfo(dragonId: number): void {
    const dragon = this.dataSource.find((d) => d.id === dragonId);
    if (dragon) {
      this.dialog.open(ModaldescripcionComponent, {
        data: dragon,
      });
    }
  }
  private updateDragonInList(updatedDragon: Dragons): void {
    const index = this.dataSource.findIndex((d) => d.id === updatedDragon.id);
    if (index > -1) {
      this.dataSource[index] = updatedDragon;
    }
  }editDragon(id: number): void {
    this.dragonService.getDragonById(id).subscribe({
      next: (dragon) => {
        // Verifica los datos antes de abrir el modal
        console.log('Datos del dragón:', dragon);
        const dialogRef = this.dialog.open(ModaleditComponent, {
          width: '500px',
          data: dragon, // Pasar los datos al modal
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            // Recargar la lista si hubo cambios
            this.loadDragons();
          }
        });
      },
      error: (err) => console.error('Error al obtener el dragón:', err),
    });
  }
  
}
