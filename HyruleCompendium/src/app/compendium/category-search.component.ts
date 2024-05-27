import { Component, OnDestroy, OnInit } from "@angular/core";
import { CompendiumClient } from "./compendium.client";
import { ICreature } from "./creature";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "hyrule-category-search",
  templateUrl: "./category-search.component.html",
  standalone: true,
  imports: [FormsModule, RouterLink]
})
export class CategorySearchComponent implements OnInit, OnDestroy {
  private _subCreatures? : Subscription;
  private _subSearch?: Subscription;
  private _searchFilter = "";

  creatures: ICreature[] = [];
  creatureResults: ISearchResult[] = [];

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

  ngOnInit(): void {
    this._client.fetchCreatures().subscribe(c => this.creatures = c);
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
    this._subSearch = this._client.filterCreatures(this.searchFilter, true)
      .subscribe(r =>
        this.creatureResults = r.map<ISearchResult>(this.mapCreature2Result));
  }

  mapCreature2Result(value: ICreature): ISearchResult {
    return {
      id: value.id.toString(),
      name: value.name,
      category: "creatures",
    }
  }
}

interface ISearchResult {
  id: string;
  name: string;
  category: string;
}
