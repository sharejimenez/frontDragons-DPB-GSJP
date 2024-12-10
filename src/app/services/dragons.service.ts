import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Dragons } from '../models/dragons';
@Injectable({
  providedIn: 'root'
})
export class DragonService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/dragons';

  constructor(private http: HttpClient) {}

  // Obtener todos los dragones
  getDragons(): Observable<Dragons[]> {
    return this.http.get<Dragons[]>(this.apiUrl).pipe(
      map(response => response),
      catchError(err => {
        console.error('Error en la API:', err);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }
  

  // Agregar un nuevo dragón
  addDragon(dragon: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/dragons', dragon);
  }
  
  // Eliminar un dragón
  deleteDragon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar dragón:', err);
        return throwError(() => new Error('Error al eliminar dragón.'));
      })
    );
  }

  // Actualizar un dragón
  updateDragon(dragon: Dragons): Observable<Dragons> {
    return this.http.put<Dragons>(`${this.apiUrl}/${dragon.id}`, dragon).pipe(
      catchError(err => {
        console.error('Error al actualizar dragón:', err);
        return throwError(() => new Error('Error al actualizar dragón.'));
      })
    );
  }
  getDragonById(id: number): Observable<Dragons> {
    return this.http.get<Dragons>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error('Error al obtener el dragón:', err);
        return throwError(() => new Error('Error al obtener el dragón.'));
      })
    );
  }
  searchDragons(term: string): Observable<Dragons[]> {
    const url = `${this.apiUrl}?search=${term}`;
    return this.http.get<Dragons[]>(url).pipe(
      catchError(err => {
        console.error('Error al buscar dragones:', err);
        return throwError(() => new Error('Error al realizar la búsqueda.'));
      })
    );
  }
  
  
  
}