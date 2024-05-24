import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatErrorComponent } from './home/caterror.component';
import { LoginComponent } from './auth/login.component';
import { authDenyGuard, authRedirectLoginGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [authRedirectLoginGuard] },
  { path: "login", component: LoginComponent },
  {
    path: "compendium",
    canActivate: [authDenyGuard],
    loadChildren: () => import("./compendium/compendium.routes").then(mod => mod.COMPENDIUM_ROUTES),
  },
  { path: "error/:id", component: CatErrorComponent },
  { path: "**", redirectTo: "error/404" },
];
