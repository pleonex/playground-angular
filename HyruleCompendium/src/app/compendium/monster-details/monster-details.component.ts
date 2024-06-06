import { TitleCasePipe } from "@angular/common";
import { Component, OnInit, WritableSignal, computed, input, signal } from "@angular/core";
import { CompendiumClient } from "../compendium.client";
import { IMonster } from "../monster";

@Component({
  selector: "hyrule-monster-details",
  templateUrl: "./monster-details.component.html",
  standalone: true,
  imports: [TitleCasePipe],
})
export class MonsterDetailsComponent implements OnInit {
  selectedId = input.required<number>();

  entries: WritableSignal<IMonster[]> = signal([]);
  entry = computed(() => this.entries().find(c => c.id == this.selectedId()));

  constructor(private _client: CompendiumClient) {
  }

  ngOnInit(): void {
    this._client.fetch<IMonster>("monsters").subscribe(d => this.entries.set(d));
  }
}
