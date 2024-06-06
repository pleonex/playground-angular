import { Component, WritableSignal, signal } from "@angular/core";
import { EntriesListPanelComponent } from "../entries-list-panel/entries-list-panel.component";
import { CreaturesDetailsComponent } from "../creatures-details/creatures-details.component";
import { ActivatedRoute } from "@angular/router";
import { EquipmentDetailsComponent } from "../equipment-details/equipment-details.component";
import { MaterialDetailsComponent } from "../material-details/material-details.component";
import { MonsterDetailsComponent } from "../monster-details/monster-details.component";
import { TreasureDetailsComponent } from "../treasure-details/treasure-details.component";

@Component({
  selector: "hyrule-entries-shell",
  templateUrl: "./entries-shell.component.html",
  standalone: true,
  imports: [
    EntriesListPanelComponent,
    CreaturesDetailsComponent,
    EquipmentDetailsComponent,
    MaterialDetailsComponent,
    MonsterDetailsComponent,
    TreasureDetailsComponent,
  ]
})
export class EntriesShellComponent {
  selectedId: WritableSignal<number> = signal(-1);
  categoryName: string;

  constructor(route: ActivatedRoute)
  {
    this.categoryName = route.snapshot.url[0].path;

    const optionalId = Number(route.snapshot.queryParamMap.get("id"));
    this.selectedId = signal(optionalId ?? -1);
  }
}
