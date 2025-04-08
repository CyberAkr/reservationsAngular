import { Routes } from '@angular/router';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
  { path: 'shows', component: ShowListComponent },
  { path: 'shows/:id', component: ShowDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, // Ajoutez cette ligne
  { path: '**', redirectTo: '/shows' }
];