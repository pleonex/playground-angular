import { Component, OnDestroy, OnInit } from "@angular/core";
import { CompendiumClient } from "./compendium.client";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ICompendiumEntry } from "./compendium-entry";

@Component({
  selector: "hyrule-category-search",
  templateUrl: "./category-search.component.html",
  standalone: true,
  imports: [FormsModule, RouterLink]
})
export class CategorySearchComponent implements OnDestroy {
  private _subCreatures? : Subscription;
  private _subSearch?: Subscription;
  private _searchFilter = "";

  creatureResults: ICompendiumEntry[] = [];

  constructor(private _client: CompendiumClient)
  {
  }

  get searchFilter(): string {
    return this._searchFilter;
  }
  set searchFilter(value: string) {
    this._searchFilter = value;
    this.search();
  }

  ngOnDestroy(): void {
    this._subCreatures?.unsubscribe();
    this._subSearch?.unsubscribe();
  }

  search(): void {
    if (this._subSearch) {
      // cancel current search (if it takes time)
      this._subSearch?.unsubscribe();
    }

    this.creatureResults = [];
    this._subSearch = this._client.fetchAndFilter<ICompendiumEntry>("creatures", this.searchFilter, true)
      .subscribe(r => this.creatureResults = r);
  }
}
