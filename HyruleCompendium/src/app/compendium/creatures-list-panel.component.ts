import { Component, OnDestroy, OnInit, model } from "@angular/core";
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
  private _subSearch?: Subscription;
  private _searchFilter = "";

  selectedId = model(0);
  loading = true;
  filteredCreatures: ICreature[] = [];

  constructor(private _client: CompendiumClient) {
  }

  get searchFilter(): string {
    return this._searchFilter;
  }
  set searchFilter(value: string) {
    this._searchFilter = value;
    this.performFilter();
  }

  ngOnInit(): void {
    this.performFilter();
  }

  ngOnDestroy(): void {
    this._subSearch?.unsubscribe();
  }

  performFilter(): void {
    if (this._subSearch) {
      this._subSearch?.unsubscribe();
    }

    this.loading = true;
    this.filteredCreatures = [];
    this._subSearch = this._client.filterCreatures(this.searchFilter, false)
      .subscribe(r => {
        this.loading = false;
        this.filteredCreatures = r;
      });
  }

  onSelectedChange(value: ICreature): void {
    this.selectedId.set(value.id);
  }
}
