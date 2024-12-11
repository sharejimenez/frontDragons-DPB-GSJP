import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { User} from '../models/user.model.model';
import { platformBrowser } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios';
  private loggedInUser: any = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<{ status: boolean; usuarios: User[] }>(this.apiUrl).pipe(
      map(response => {
        const users = response.usuarios || [];
        const user = users.find((u: User) => u.usuario === username && u.contrasena === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(err => {
        console.error('Error en la API:', err);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  
  
  // Obtener el usuario que ha iniciado sesión
  getAutenticadoUsuario(): any {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.loggedInUser) {
        const storedUser = localStorage.getItem('currentUser'); // Asegúrate de usar la clave correcta
        if (storedUser) {
          this.loggedInUser = JSON.parse(storedUser);
          if (this.loggedInUser.imagen) {
            this.loggedInUser.avatar = `http://127.0.0.1:8000${this.loggedInUser.imagen}`;
          }
        }
      }
    }
    return this.loggedInUser;
  }
  
}
