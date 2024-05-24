import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ICreature } from "./creature";
import { CompendiumClient } from "./compendium.client";
import { Subscription } from "rxjs";
import { TitleCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "hyrule-creatures-list-panel",
  templateUrl: "./creatures-list-panel.component.html",
  styleUrl: "./creatures-list-panel.component.css",
  standalone: true,
  imports: [TitleCasePipe, FormsModule, RouterLink]
})
export class CreaturesListPanelComponent implements OnInit, OnDestroy {
  private _subFetch?: Subscription;
  private _searchName = "";

  @Input() selectedId?: number;
  @Output() selectionChanged = new EventEmitter<number>();
  creatures: ICreature[] = [];
  filteredCreatures: ICreature[] = [];

  constructor(private _client: CompendiumClient) {
  }

  get searchName(): string {
    return this._searchName;
  }
  set searchName(value: string) {
    this._searchName = value;
    this.performFilter();
  }

  ngOnInit(): void {
    this._subFetch = this._client.fetchCreatures().subscribe(d => {
      this.creatures = d.data;
      this.performFilter();
    });
  }

  ngOnDestroy(): void {
    this._subFetch?.unsubscribe();
  }

  performFilter(): void {
    this.filteredCreatures = this.creatures.filter(c =>
      c.name.includes(this.searchName) || (c.id == Number.parseInt(this.searchName))
    )
    .sort((a, b) => a.id - b.id);
  }

  onSelectedChange(value: ICreature): void {
    this.selectedId = value.id;
    this.selectionChanged.emit(value.id);
  }
}
