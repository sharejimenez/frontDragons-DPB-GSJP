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
@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, RouterLink, MatNavList, RouterOutlet, MatToolbarModule, MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule, FormsModule, HttpClientModule, MatIconModule, NavbarComponent],
  providers: [PokemonService],

  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];
  dataSource: any[] = []; // Todos los Pokémon
  filteredData: any[] = []; // Filtered Pokémon based on search

  paginatedData: any[] = []; // Pokémon de la página actual
  searchTerm: string = ''; 
  pageSize: number = 8; // Número de Pokémon por página
  currentPage: number = 0; // Página actual
  selectedPokemon: any = null;

  constructor(private dialog: MatDialog, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  // Cargar los Pokémon de la página actual
  loadPokemons(): void {
    const offset = this.currentPage * this.pageSize;
    this.pokemonService.getPokemons(this.pageSize, offset).subscribe((data) => {
      this.dataSource = data;
      this.updatePaginatedData();
      this.filteredData = data; // Initialize filtered data with all Pokémon

    });
  }
  filterPokemons(): void {
    if (!this.searchTerm) {
      this.filteredData = this.dataSource; // If no search term, show all Pokémon
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.dataSource.filter(pokemon =>
        pokemon.name.toLowerCase().includes(term) || 
        pokemon.id.toString().includes(term) // Also filter by ID if needed
      );
    }
  }
  // Actualizar los datos de la página actual
  updatePaginatedData(): void {
    this.paginatedData = this.dataSource;
  }

  // Ver más información de un Pokémon
  viewInfo(pokemonId: number): void {
    this.selectedPokemon = this.paginatedData.find(pokemon => pokemon.id === pokemonId);
    if (this.selectedPokemon) {
      this.dialog.open(ModaldescripcionComponent, {
        data: this.selectedPokemon
      });
    }
  }

  // Editar un Pokémon
  editPokemon(pokemonId: number): void {
    const originalPokemon = this.paginatedData.find(pokemon => pokemon.id === pokemonId);
  
    if (originalPokemon) {
      const pokemonCopy = JSON.parse(JSON.stringify(originalPokemon));
      const dialogRef = this.dialog.open(ModaleditComponent, {
        data: pokemonCopy // Pasa la copia al modal
      });
  
      dialogRef.afterClosed().subscribe((updatedPokemon) => {
        if (updatedPokemon) {
          const index = this.paginatedData.findIndex(pokemon => pokemon.id === updatedPokemon.id);
          if (index !== -1) {
            this.paginatedData[index] = updatedPokemon;
            this.updatePaginatedData();
          }
        }
      });
    }
  }

  // Eliminar un Pokémon
  deletePokemon(pokemonId: number): void {
    this.selectedPokemon = this.paginatedData.find(pokemon => pokemon.id === pokemonId);
    if (this.selectedPokemon) {
      const dialogRef = this.dialog.open(ModaleliminarComponent, {
        data: this.selectedPokemon
      });

      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          const index = this.paginatedData.findIndex(pokemon => pokemon.id === pokemonId);
          if (index !== -1) {
            this.paginatedData.splice(index, 1); // Elimina el Pokémon de la tabla
            this.updatePaginatedData(); // Actualiza la vista
          }
        }
      });
    }
  }

  // Cambiar página
  changePage(direction: number): void {
    this.currentPage += direction;
    this.loadPokemons();
  }

  // Obtener el número total de páginas
  getTotalPages(): number {
    return Math.ceil(1118 / this.pageSize); // Total de Pokémon en la API
  }
}