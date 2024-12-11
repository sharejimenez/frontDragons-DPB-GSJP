import { Component, computed, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { signal } from '@angular/core';
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from '@angular/router';
export type MenuItem={
  icon:string;
  label:string;
  link:string;
}
@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatListModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css'
})
export class OpcionesComponent {
  constructor(private router: Router, private userservice:AuthService) {}
   avatarUrl: string | null = null; // Variable para almacenar el avatar
  username='';
  avatar='';  
  loggedInUser: any = null;

  nombre='';
  user: Array<any>=[];
  usuarioAutenticado: any = null;

  sideNavCollapsed=signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  };
  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Inicio', link: '/sidebar/welcome' },
    { icon: 'group', label: 'Usuarios', link: '/sidebar/list' },
    { icon: 'shield', label: 'Dragones', link: '/sidebar/dragones' },
    { icon: 'gamepad', label: 'Catalogo', link: '/sidebar/catalogo' },

  ]);
  

  profilePicsSize=computed(()=>this.sideNavCollapsed()? '32px' : '100px');

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
}
