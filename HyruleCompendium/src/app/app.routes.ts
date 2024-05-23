import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatErrorComponent } from './home/caterror.component';
import { LoginComponent } from './auth/login.component';
import { authDenyGuard, authRedirectLoginGuard } from './auth/auth.guard';
import { CompendiumComponent } from './compendium/compendium.component';

export const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [authRedirectLoginGuard] },
  { path: "login", component: LoginComponent },
  { path: "compendium", component: CompendiumComponent, canActivate: [authDenyGuard] },
  { path: "error/:id", component: CatErrorComponent },
  { path: "**", redirectTo: "error/404" },
];
