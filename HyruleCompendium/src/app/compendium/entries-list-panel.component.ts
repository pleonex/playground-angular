import { Component, OnDestroy, OnInit, input, model } from "@angular/core";
import { CompendiumClient } from "./compendium.client";
import { Subscription } from "rxjs";
import { TitleCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ICompendiumEntry } from "./compendium-entry";

@Component({
  selector: "hyrule-entries-list-panel",
  templateUrl: "./entries-list-panel.component.html",
  styleUrl: "./entries-list-panel.component.css",
  standalone: true,
  imports: [TitleCasePipe, FormsModule, RouterLink]
})
export class EntriesListPanelComponent implements OnInit, OnDestroy {
  private _subSearch?: Subscription;
  private _searchFilter = "";

  categoryName = input.required<string>();
  selectedId = model(0);
  loading = true;
  filtered: ICompendiumEntry[] = [];

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
    this.filtered = [];
    this._subSearch = this._client.fetchAndFilter<ICompendiumEntry>(this.categoryName(), this.searchFilter, false)
      .subscribe(r => {
        this.loading = false;
        this.filtered = r;
      });
  }

  onSelectedChange(value: ICompendiumEntry): void {
    this.selectedId.set(value.id);
  }
}
