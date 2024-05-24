import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IXkcdComic } from "./XkcdComic";
import { Observable, catchError, of, tap } from "rxjs";
import { BaseClient } from "../base.client";

@Injectable({
  providedIn: 'root',
})
export class XkcdClient extends BaseClient {
  private _api = "/api/xkcd"; // dev proxy redirects to XKCD website to prevent CORS issues
  private _latest?: IXkcdComic;

  constructor(http: HttpClient)
  {
    super(http);
  }

  fetchLatest(): Observable<IXkcdComic> {
    if (this._latest) {
      return of(this._latest);
    }

    return this._http.get<IXkcdComic>(this._api).pipe(
      tap(d => this._latest = d),
      catchError(this.handleError)
    );
  }
}
