import { Component, WritableSignal, signal } from "@angular/core";
import { EntriesListPanelComponent } from "./entries-list-panel.component";
import { CreaturesDetailsComponent } from "./creatures-details.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "hyrule-entries-shell",
  templateUrl: "./entries-shell.component.html",
  standalone: true,
  imports: [EntriesListPanelComponent, CreaturesDetailsComponent]
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
