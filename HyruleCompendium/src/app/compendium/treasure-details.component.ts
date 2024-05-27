import { TitleCasePipe } from "@angular/common";
import { Component, WritableSignal, computed, input, signal } from "@angular/core";
import { CompendiumClient } from "./compendium.client";
import { ITreasure } from "./treasure";

@Component({
  selector: "hyrule-treasure-details",
  templateUrl: "./treasure-details.component.html",
  standalone: true,
  imports: [TitleCasePipe],
})
export class TreasureDetailsComponent {
  selectedId = input.required<number>();

  entries: WritableSignal<ITreasure[]> = signal([]);
  entry = computed(() => this.entries().find(c => c.id == this.selectedId()));

  constructor(private _client: CompendiumClient) {
  }

  ngOnInit(): void {
    this._client.fetch<ITreasure>("treasure").subscribe(d => this.entries.set(d));
  }
}
