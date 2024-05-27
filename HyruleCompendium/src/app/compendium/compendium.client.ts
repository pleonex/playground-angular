import { Injectable } from "@angular/core";
import { BaseClient } from "../base.client";
import { HttpClient } from "@angular/common/http";
import { ICreature } from "./creature";
import { Observable, catchError, map, of, tap, filter, delay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CompendiumClient extends BaseClient {
  private readonly _categoryEndpoint = "api/compendium/category/";

  private _creatures?: ICreature[];

  constructor(http: HttpClient) {
    super(http);
  }

  fetchCreatures(): Observable<ICreature[]> {
    if (this._creatures) {
      return of(this._creatures);
    }

    return this._http.get<DataElement<ICreature[]>>(this._categoryEndpoint + "creatures")
      .pipe(
        map(d => d.data.sort((a, b) => a.id - b.id)),
        tap(d => this._creatures = d),
        catchError(this.handleError),
      );
  }

  filterCreatures(filterText: string, nothingIfEmpty: boolean): Observable<ICreature[]> {
    if (nothingIfEmpty && (!filterText || filterText.length < 1)) {
      return of([]);
    }

    const filterAsNumber = Number(filterText);
    return this.fetchCreatures()
      .pipe(
        map(d => d.filter(c => c.name.includes(filterText) || c.id == filterAsNumber)),
      );
  }
}

export interface DataElement<T> {
  data: T;
}
