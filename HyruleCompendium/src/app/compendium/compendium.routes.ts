import { Routes } from "@angular/router";
import { CompendiumComponent } from "./compendium.component";
import { EntriesShellComponent } from "./entries-shell.component";

export const COMPENDIUM_ROUTES: Routes = [
  { path: "", component: CompendiumComponent },
  { path: "creatures", component: EntriesShellComponent },
  { path: "equipment", component: EntriesShellComponent },
  { path: "materials", component: EntriesShellComponent },
  { path: "monsters", component: EntriesShellComponent },
  { path: "treasures", component: EntriesShellComponent },
];
