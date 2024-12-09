import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModaldescripcionComponent } from '../modaldescripcion/modaldescripcion.component';
import { ModaleditComponent } from '../modaledit/modaledit.component';
import { FormsModule } from '@angular/forms';
import { ModaleliminarComponent } from '../modaleliminar/modaleliminar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatNavList } from '@angular/material/list';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { DragonService } from '../services/dragons.service';
@Component({
  selector: 'app-dragon', // Cambia el selector si es necesario
  standalone: true,
  imports: [CommonModule, RouterLink, MatNavList, RouterOutlet, MatToolbarModule, MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule, FormsModule, HttpClientModule, MatIconModule, NavbarComponent],
  providers: [DragonService], // Cambia a DragonService

  templateUrl: './pokemon.component.html', // Cambia el nombre del archivo de plantilla si es necesario
  styleUrls: ['./pokemon.component.css'] // Cambia el nombre del archivo de estilos si es necesario
})
export class PokemonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];
  dataSource: any[] = []; // Todos los dragones
  filteredData: any[] = []; // Dragones filtrados según la búsqueda

  paginatedData: any[] = []; // Dragones de la página actual
  searchTerm: string = ''; 
  pageSize: number = 8; // Número de dragones por página
  currentPage: number = 0; // Página actual
  selectedDragon: any = null;

  constructor(private dialog: MatDialog, private dragonService: DragonService) {} // Cambia a DragonService

  ngOnInit(): void {
    this.loadDragons(); // Cambia a loadDragons
  }

  loadDragons(): void {
    const offset = this.currentPage * this.pageSize;
    this.dragonService.getDragons().subscribe((data) => { // Cambia a getDragons
      this.dataSource = data;
      this.updatePaginatedData();
      this.filteredData = data; // Inicializa los datos filtrados con todos los dragones
    });
  }

  filterDragons(): void { // Cambia el nombre a filterDragons
    if (!this.searchTerm) {
      this.filteredData = this.dataSource; // Si no hay término de búsqueda, muestra todos los dragones
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.dataSource.filter(dragon =>
        dragon.name.toLowerCase().includes(term) || 
        dragon.id.toString().includes(term) // También filtra por ID si es necesario
      );
    }
  }

  updatePaginatedData(): void {
    this.paginatedData = this.filteredData.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize); // Actualiza la paginación con los dragones filtrados
  }

  viewInfo(dragonId: number): void {
    this.dragonService.getDragonById(dragonId).subscribe({
      next: (dragon) => {
        // Abre el modal con los datos del dragón
        this.dialog.open(ModaldescripcionComponent, {
          width: '400px',
          data: dragon
        });
      },
      error: (err) => console.error('Error al obtener el dragón:', err),
    });
  }
  
  editDragon(id: number): void {
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

  
  deleteDragon(dragonId: number): void { // Cambia a deleteDragon
    this.selectedDragon = this.paginatedData.find(dragon => dragon.id === dragonId);
    if (this.selectedDragon) {
      const dialogRef = this.dialog.open(ModaleliminarComponent, {
        data: this.selectedDragon
      });

      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          const index = this.paginatedData.findIndex(dragon => dragon.id === dragonId);
          if (index !== -1) {
            this.paginatedData.splice(index, 1); // Elimina el dragón de la tabla
            this.updatePaginatedData(); // Actualiza la vista
          }
        }
      });
    }
  }

  changePage(direction: number): void {
    this.currentPage += direction;
    this.loadDragons(); // Carga los dragones para la nueva página
  }

  getTotalPages(): number {
    return Math.ceil(1118 / this.pageSize); // Total de dragones en la API (ajusta según tu API)
  }
}