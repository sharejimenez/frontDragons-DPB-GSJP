import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatSidenavModule,RouterLink, RouterOutlet ,NgxPaginationModule,
    CommonModule, MatTableModule,MatToolbarModule,
    MatPaginatorModule, MatCardModule,
    MatSortModule, CommonModule, NavbarComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private router: Router, private userservice: UserService) {}
  username='';
  password='';
  user: Array<any>=[]; 
  page: number = 1; // Current page number
  pageSize: number = 10;
  ngOnInit(): void {
    this.userservice.getUsers().subscribe((data)=> {
    this.user = Object.values(data);
    console.log(this.user);
    });
  }
  iniciarSesion() {
    this.router.navigate(['/welcome']);
    const UsuarioExistente=this.user.find(
      (user )=>user.email===this.username && user.password===this.password
    ); 
    if (UsuarioExistente)
    {
      this.router.navigate(['/list']);
    }
  }


  registrar() {
    this.router.navigate(['/welcome']);
  }
}
