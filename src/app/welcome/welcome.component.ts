import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  navigateToDragons() {
    this.router.navigate(['/sidebar/dragones']); // Redirige a la página de dragones
  }
}
