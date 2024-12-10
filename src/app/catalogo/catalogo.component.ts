import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DragonService } from '../services/dragons.service';
import { Dragons } from '../models/dragons';
import { MatGridListModule } from '@angular/material/grid-list';  // Importa MatGridListModule

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    CommonModule,MatGridListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  dataSource: Dragons[] = [];
  originalDataSource: Dragons[] = [];
  searchTerm: string = '';

  private dragonService = inject(DragonService);

  ngOnInit(): void {
    this.loadDragons();
  }

  loadDragons(): void {
    this.dragonService.getDragons().subscribe((data) => {
      this.originalDataSource = data;
      this.dataSource = [...this.originalDataSource];
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.toLowerCase();
    this.dataSource = this.originalDataSource.filter(dragon =>
      dragon.nombre.toLowerCase().includes(filterValue) ||
      dragon.rareza.toLowerCase().includes(filterValue) ||
      dragon.elemento.toLowerCase().includes(filterValue)
    );
  }
}
