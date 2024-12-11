import { Component, computed } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { OpcionesComponent } from '../opciones/opciones.component';
import { signal } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ListComponent } from '../../list/list.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, OpcionesComponent, RouterOutlet,
    RouterLink, RouterLinkActive, ListComponent,MatMenuModule],  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
 
  constructor(private router: Router, private userservice:AuthService) {}
   avatarUrl: string | null = null; // Variable para almacenar el avatar
  username='';
  avatar='';  
  loggedInUser: any = null;

  nombre='';
  user: Array<any>=[];
  usuarioAutenticado: any = null;

  ngOnInit(): void {
    this.loggedInUser = this.userservice.getAutenticadoUsuario();
    console.log('Usuario logueadoeee:', this.loggedInUser); 
    const user = localStorage.getItem('user');
    if (user) {
      this.usuarioAutenticado = JSON.parse(user);

      this.nombre = this.usuarioAutenticado.nombre ;
      console.log('Nombre:', this.nombre);
      // Intenta acceder al campo
      console.log('Usuario autenticado:', this.usuarioAutenticado);
    } else {
      console.log('No hay usuario autenticado en localStorage.');
      this.router.navigate(['/login']); // Redirigir a login si no hay usuario
    }
  }
  collapsed=signal(false);
  sidevabWidth=computed(()=>this.collapsed() ? '65px' : '250px');
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); 
    this.usuarioAutenticado = null; // Asegúrate de limpiar el estado interno
    this.loggedInUser = null; // Asegúrate de limpiar el estado interno

  }
}
