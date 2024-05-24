import { Component, OnInit } from "@angular/core";
import { CreaturesListPanelComponent } from "./creatures-list-panel.component";
import { CreaturesDetailsComponent } from "./creatures-details.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "hyrule-creatures-shell",
  templateUrl: "./creatures-shell.component.html",
  standalone: true,
  imports: [CreaturesListPanelComponent, CreaturesDetailsComponent]
})
export class CreaturesShellComponent implements OnInit {
  selectedId?: number;

  constructor(private route: ActivatedRoute)
  {
  }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.queryParamMap.get("id")) ?? null;
  }

  onSelectionChanged(id: number): void {
    this.selectedId = id;
  }
}
