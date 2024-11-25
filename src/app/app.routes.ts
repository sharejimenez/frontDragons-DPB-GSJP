import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { Portal } from '@angular/cdk/portal';
import { WelcomeComponent } from './welcome/welcome.component';
export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'welcome', component: WelcomeComponent},

        {path: 'sidebar',
        component: SidebarComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'list', component: ListComponent },
          { path: 'pokemon', component: PokemonComponent },
          {path:'welcome', component: WelcomeComponent},

          { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
        ]
      },




    {path:'', redirectTo:'/login', pathMatch:'full'},

];
