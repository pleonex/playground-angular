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

  private _compendium: { [category: string]: ICompendiumEntry[] } = {};

  constructor(http: HttpClient) {
    super(http);
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
