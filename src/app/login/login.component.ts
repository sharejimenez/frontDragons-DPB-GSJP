import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule, CommonModule] // Asegúrate de incluir CommonModule aquí
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          console.log('Navegando a /sidebar/welcome');
          const user = { username: this.username };
          localStorage.setItem('user', JSON.stringify(user));
          
          this.router.navigate(['/sidebar/welcome']);

        } else {
          this.showErrorAlert('Usuario o contraseña incorrectos');
        }
      },
      error => {
        console.error('Error en el login:', error);
        this.showErrorAlert('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
    );
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonText: 'Aceptar'
    });
  }
}  