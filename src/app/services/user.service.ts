import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class UserService {
  
  //url donde se obtienen los usuarios (api escuela)
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}
  /* httpcliente para realizar las solicitudes HTTP
  el getusers es para obtener la lista de usuarios*/
  private loggedInUser: any = null;

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }
  //solicitud GET a la API y devuelve un observable con la respuesta

  getUser(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
 
  setLoggedInUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user)); 
    }
  }

  getLoggedInUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.loggedInUser) {
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      }
    }
    return this.loggedInUser;
  }
  getCurrentUser(): Observable<any> {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && !this.currentUserSubject.value) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    return this.currentUserSubject.asObservable();
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
}
