import { TitleCasePipe } from "@angular/common";
import { Component, OnInit, WritableSignal, computed, input, signal } from "@angular/core";
import { IEquipment } from "./equipment";
import { CompendiumClient } from "./compendium.client";

@Component({
  selector: "hyrule-equipment-details",
  templateUrl: "./equipment-details.component.html",
  standalone: true,
  imports: [TitleCasePipe],
})
export class EquipmentDetailsComponent implements OnInit {
  selectedId = input.required<number>();

  entries: WritableSignal<IEquipment[]> = signal([]);
  entry = computed(() => this.entries().find(c => c.id == this.selectedId()));

  constructor(private _client: CompendiumClient) {
  }

  ngOnInit(): void {
    this._client.fetch<IEquipment>("equipment").subscribe(d => this.entries.set(d));
  }
}
