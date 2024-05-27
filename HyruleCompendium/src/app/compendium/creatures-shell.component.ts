import { Component, WritableSignal, signal } from "@angular/core";
import { CreaturesListPanelComponent } from "./creatures-list-panel.component";
import { CreaturesDetailsComponent } from "./creatures-details.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "hyrule-creatures-shell",
  templateUrl: "./creatures-shell.component.html",
  standalone: true,
  imports: [CreaturesListPanelComponent, CreaturesDetailsComponent]
})
export class CreaturesShellComponent {
  selectedId: WritableSignal<number> = signal(-1);

  constructor(route: ActivatedRoute)
  {
    const optionalId = Number(route.snapshot.queryParamMap.get("id"));
    this.selectedId = signal(optionalId ?? -1);
  }
}
