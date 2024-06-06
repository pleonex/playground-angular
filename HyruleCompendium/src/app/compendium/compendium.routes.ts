import { Routes } from "@angular/router";
import { CategoriesComponent } from "./categories/categories.component";
import { EntriesShellComponent } from "./entries-shell/entries-shell.component";

export const COMPENDIUM_ROUTES: Routes = [
  { path: "", component: CategoriesComponent },
  { path: "creatures", component: EntriesShellComponent },
  { path: "equipment", component: EntriesShellComponent },
  { path: "materials", component: EntriesShellComponent },
  { path: "monsters", component: EntriesShellComponent },
  { path: "treasure", component: EntriesShellComponent },
];
