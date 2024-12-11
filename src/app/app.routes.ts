import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { Portal } from '@angular/cdk/portal';
import { WelcomeComponent } from './welcome/welcome.component';
import { OpcionesComponent } from './dashboard/opciones/opciones.component';
import { DragonsComponent } from './dragon/dragon.component';
import { ModaldescripcionComponent } from './modaldescripcion/modaldescripcion.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

  export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'sidebar',
        component: SidebarComponent,
        children: [
            { path: 'option', component: OpcionesComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'list', component: ListComponent },
            { path: 'welcome', component: WelcomeComponent },
            { path: 'dragones', component: DragonsComponent},
            { path: 'descrip', component: ModaldescripcionComponent},
            { path: 'catalogo', component: CatalogoComponent},

            { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
