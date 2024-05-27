import { TitleCasePipe } from "@angular/common";
import { Component, OnInit, WritableSignal, computed, input, signal } from "@angular/core";
import { IMaterial } from "./material";
import { CompendiumClient } from "./compendium.client";

@Component({
  selector: "hyrule-material-details",
  templateUrl: "./material-details.component.html",
  standalone: true,
  imports: [TitleCasePipe],
})
export class MaterialDetailsComponent implements OnInit {
  selectedId = input.required<number>();

  entries: WritableSignal<IMaterial[]> = signal([]);
  entry = computed(() => this.entries().find(c => c.id == this.selectedId()));

  constructor(private _client: CompendiumClient) {
  }

  ngOnInit(): void {
    this._client.fetch<IMaterial>("materials").subscribe(d => this.entries.set(d));
  }
}
