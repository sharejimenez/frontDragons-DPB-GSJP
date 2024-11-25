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
import { DashboardComponent } from '../dashboard.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, OpcionesComponent, RouterOutlet,
    RouterLink, RouterLinkActive, ListComponent,MatMenuModule],  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 
  constructor(private router: Router, private userservice:UserService) {}
   avatarUrl: string | null = null; // Variable para almacenar el avatar
  username='';
  avatar='';  
  user: Array<any>=[];

  ngOnInit(): void {
    // Recuperar datos del usuario desde localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.username = user.name || ''; // Asigna el nombre del usuario
      this.avatar = user.avatar || ''; // Asigna el avatar del usuario
    } else {
      console.log('No hay usuario autenticado en localStorage.');
      this.router.navigate(['/login']); // Redirigir si no hay usuario autenticado
    }
  }
  
  collapsed=signal(false);
  sidevabWidth=computed(()=>this.collapsed() ? '65px' : '250px');
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }
}
