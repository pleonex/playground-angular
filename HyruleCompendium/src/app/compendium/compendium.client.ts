import { Injectable } from "@angular/core";
import { BaseClient } from "../base.client";
import { HttpClient } from "@angular/common/http";
import { ICreature } from "./creature";
import { Observable, catchError, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CompendiumClient extends BaseClient {
  private readonly _categoryEndpoint = "api/compendium/category/";

  private _creatures?: DataElement<ICreature[]>;

  constructor(http: HttpClient) {
    super(http);
  }

  fetchCreatures(): Observable<DataElement<ICreature[]>> {
    if (this._creatures) {
      return of(this._creatures);
    }

    return this._http.get<DataElement<ICreature[]>>(this._categoryEndpoint + "creatures")
      .pipe(
        tap(d => this._creatures = d),
        catchError(this.handleError),
      );
  }
}

export interface DataElement<T> {
  data: T;
}
