import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    CommonModule, FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private userservice: UserService) {}
  username='';
  password='';
  user: Array<any>=[]; 
  ngOnInit(): void {
    this.userservice.getUsers().subscribe((data)=> {
    this.user = Object.values(data);
    console.log(this.user);
    
    });
  }
  iniciarSesion() {
    const UsuarioExistente = this.user.find(
      (user) => user.email === this.username && user.password === this.password
    ); 
    if (UsuarioExistente) {
      console.log("login exitoso");
      console.log("nombreusuario:", UsuarioExistente.name); // Aquí se muestra el avatar

      console.log("Avatar del usuario:", UsuarioExistente.avatar); // Aquí se muestra el avatar
      localStorage.setItem('loggedInUser', JSON.stringify({
        name: UsuarioExistente.name,
        avatar: UsuarioExistente.avatar
      }));
      this.router.navigate(['/sidebar/welcome']);
    } else {
      console.log("Usuario no encontrado");
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos',
        footer: '<a href="#">¿Olvidaste tu contraseña?</a>'
      });
    }
  }

  registrar() {
    this.router.navigate(['/sidebar/welcome']);
  }
}
