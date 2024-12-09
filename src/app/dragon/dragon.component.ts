import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-dragons',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.css']
})
export class DragonsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'imagen', 'nombre', 'rareza', 'elemento', 'acciones'];
  dataSource: Dragons[] = [];
  originalDataSource: Dragons[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 8;

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
  }

  deleteDragon(id: number): void {
    if (confirm('¿Estás seguro de eliminar este dragón?')) {
      this.dragonService.deleteDragon(id).subscribe(() => {
        this.dataSource = this.dataSource.filter((dragon) => dragon.id !== id);
      });
    }
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(ModalagregaComponent);

    dialogRef.afterClosed().subscribe((newDragon) => {
      if (newDragon) {
        this.dataSource = [...this.dataSource, newDragon]; // Clonamos el arreglo y agregamos el nuevo dragón
        this.loadDragons();

      }
    });
  }

  private addDragonToList(newDragon: Dragons): void {
    this.dataSource = [...this.dataSource, newDragon];
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
