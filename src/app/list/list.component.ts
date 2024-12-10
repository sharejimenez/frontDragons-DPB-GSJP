import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    RouterOutlet,
    NgxPaginationModule,
    MatCardModule,
    MatToolbarModule,
    NavbarComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  // Variables
  displayedColumns: string[] = ['nombre', 'apellido', 'usuario', 'correo'];

  usuarios: any[] = []; // Lista de usuarios
  usuarioAutenticado: any = null; // Usuario autenticado desde localStorage
  nombre: string = ''; // Nombre del usuario autenticado
  page: number = 1; // Página actual para paginación
  pageSize: number = 10; // Tamaño de página

  // Constructor
  constructor(private router: Router, private userService: AuthService) {}

  // OnInit Lifecycle
  ngOnInit(): void {
    // Verificar usuario autenticado desde localStorage
    const user = localStorage.getItem('user');
    if (user) {
      // Si hay un usuario autenticado en el almacenamiento local
      this.usuarioAutenticado = JSON.parse(user);
      this.nombre = this.usuarioAutenticado.nombre;
      console.log('Nombre del usuario autenticado:', this.nombre);
  
      // Obtener todos los usuarios desde el API
      this.getAllUsers();
    } else {
      // Si no hay usuario autenticado, redirigir a login
      console.log('No hay usuario autenticado en localStorage.');
      this.router.navigate(['/login']);
    }
  }

  // Método para obtener todos los usuarios
  getAllUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        // Asume que el API devuelve los usuarios en `response.usuarios`
        this.usuarios = response.usuarios || [];
        console.log('Usuarios obtenidos:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  // Método para redirigir al inicio de sesión
  iniciarSesion(): void {
    this.router.navigate(['/welcome']);
  }

  // Método para redirigir al registro
  registrar(): void {
    this.router.navigate(['/welcome']);
  }
}
