import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatNavList } from '@angular/material/list';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink,MatNavList, RouterOutlet ,MatToolbarModule,MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private userservice: UserService) {}
  name='';
  user: Array<any>=[];

  ngOnInit(): void {
    this.userservice.getUsers().subscribe((data)=> {
    this.user = Object.values(data);
    console.log(this.user);
   
    });
  }

  sidenavOpened = false;
  logout(){}
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
  editarPerfil() {
    console.log('Editar perfil clickeado');
    // Navega a la página de edición de perfil
  }
  
  salir() {
    this.router.navigate(['/login']);

    console.log('Salir clickeado');
    
  }
}
