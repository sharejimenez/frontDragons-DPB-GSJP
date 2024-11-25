import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  constructor(private router: Router) {}
  salir() {
    this.router.navigate(['/login']);

    console.log('Salir clickeado');
    
  }
}
