import { Routes } from "@angular/router";
import { CompendiumComponent } from "./compendium.component";
import { CreaturesShellComponent } from "./creatures-shell.component";

export const COMPENDIUM_ROUTES: Routes = [
  { path: "", component: CompendiumComponent },
  { path: "creatures", component: CreaturesShellComponent },
];
