import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject , throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { User} from '../models/user.model.model';
import { platformBrowser } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);

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
        const user = response.usuarios.find(
          (u: User) => u.usuario === username && u.contrasena === password
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      }),
      catchError(err => {
        console.error('Error en la API:', err);
        throw new Error('Error al conectar con la API.');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  
  // Obtener el usuario que ha iniciado sesión
 getAutenticadoUsuario(): any {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.imagen) {
      user.avatar = `http://127.0.0.1:8000${user.imagen}`;
    }
    return user;
  }
  return null;
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('currentUser');
}

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
  
}
