import { Component, computed, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { signal } from '@angular/core';
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
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
  avatarUrl: string | null = null; // Variable para almacenar el avatar

  constructor( private userservice: UserService) {}

  @Input() userImage: string | null = null; // Imagen del usuario logueado
  loggedInUser: any = null;

  sideNavCollapsed=signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  };
  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Inicio', link: '/sidebar/welcome' },
    {icon: 'sports_esports  ',label: 'Dragones',link: '/sidebar/pokemon' },
    { icon: 'group', label: 'Usuarios', link: '/sidebar/list' },
    { icon: 'person', label: 'Dragones', link: '/sidebar/dragones' },

  ]);
  

  profilePicsSize=computed(()=>this.sideNavCollapsed()? '32px' : '100px');

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.avatarUrl = user.avatar || null; // Asignamos el avatar del usuario
    }
    this.loggedInUser = this.userservice.getLoggedInUser();

    console.log('Usuariologueado:', this.loggedInUser); 

  }
}
