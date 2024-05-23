import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatErrorComponent } from './home/caterror.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "error/:id", component: CatErrorComponent },
  { path: "**", redirectTo: "error/404" },
];
