import { Component, WritableSignal, computed, input, signal } from "@angular/core";
import { ICreature } from "./creature";
import { CompendiumClient } from "./compendium.client";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "hyrule-creatures-details",
  templateUrl: "./creatures-details.component.html",
  standalone: true,
  imports: [TitleCasePipe]
})
export class CreaturesDetailsComponent {
  selectedId = input.required<number>();

  creatures: WritableSignal<ICreature[]> = signal([]);
  creature = computed(() => this.creatures().find(c => c.id == this.selectedId()));

  constructor(private _client: CompendiumClient) {
  }

  ngOnInit(): void {
    this._client.fetchCreatures().subscribe(d => this.creatures.set(d));
  }
}
