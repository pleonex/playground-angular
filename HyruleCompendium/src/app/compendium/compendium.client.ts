import { Injectable } from "@angular/core";
import { BaseClient } from "../base.client";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, tap } from "rxjs";
import { ICompendiumEntry } from "./compendium-entry";

@Injectable({
  providedIn: "root",
})
export class CompendiumClient extends BaseClient {
  private readonly _categoryEndpoint = "api/compendium/category/";
  private readonly _allEndpoint = "api/compendium/all";

  private _compendium: { [category: string]: ICompendiumEntry[] } = {};
  private _fetchedAll = false;

  constructor(http: HttpClient) {
    super(http);
  }

  fetchAll(): Observable<{ [category: string]: ICompendiumEntry[] }> {
    if (this._fetchedAll) {
      return of(this._compendium);
    }

    return this._http.get<DataElement<ICompendiumEntry[]>>(this._allEndpoint)
      .pipe(
        map(d => d.data.sort((a, b) => a.id - b.id)),
        tap(d => {
          this._fetchedAll = true;
          for (const entry of d) {
            if (!this._compendium[entry.category]) {
              this._compendium[entry.category] = [];
            }

            this._compendium[entry.category].push(entry);
          }
        }),
        map(() => this._compendium),
        catchError(this.handleError),
      );
  }

  fetchAllAndFilter(filterText: string, nothingIfEmpty: boolean): Observable<{ [category: string]: ICompendiumEntry[] }> {
    if (nothingIfEmpty && (!filterText || filterText.length < 1)) {
      return of({});
    }

    const filterAsNumber = Number(filterText);
    return this.fetchAll()
      .pipe(
        map(d => {
          const result: {[category: string]: ICompendiumEntry[] } = {}
          for (const cat in d) {
            result[cat] = d[cat].filter(c => c.name.includes(filterText) || c.id == filterAsNumber);
          }
          return result;
        }),
      );
  }

  fetch<T extends ICompendiumEntry>(category: string): Observable<T[]> {
    if (this._compendium[category]) {
      return of(this._compendium[category] as T[]);
    }

    return this._http.get<DataElement<T[]>>(this._categoryEndpoint + category)
      .pipe(
        map(d => d.data.sort((a, b) => a.id - b.id)),
        tap(d => this._compendium[category] = d),
        catchError(this.handleError),
      );
  }

  fetchAndFilter<T extends ICompendiumEntry>(category: string, filterText: string, nothingIfEmpty: boolean): Observable<T[]> {
    if (nothingIfEmpty && (!filterText || filterText.length < 1)) {
      return of([]);
    }

    const filterAsNumber = Number(filterText);
    return this.fetch<T>(category)
      .pipe(
        map(d => d.filter(c => c.name.includes(filterText) || c.id == filterAsNumber)),
      );
  }
}

export interface DataElement<T> {
  data: T;
}
