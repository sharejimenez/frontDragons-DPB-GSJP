import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
//import { UserListComponent } from './components/user-list/user-list.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, TopbarComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'login';
}
