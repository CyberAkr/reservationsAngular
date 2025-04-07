import { Routes } from '@angular/router';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';

export const routes: Routes = [
  { path: 'shows', component: ShowListComponent },
  { path: 'shows/:id', component: ShowDetailComponent },
  { path: '', redirectTo: '/shows', pathMatch: 'full' }
];