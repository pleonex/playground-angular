import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IXkcdComic } from "./XkcdComic";
import { Observable, catchError, of, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class XkcdClient {
  private _api = "/api/xkcd"; // dev proxy redirects to XKCD website to prevent CORS issues
  private _latest?: IXkcdComic;

  constructor(private _http: HttpClient)
  {
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

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    console.log(err);
    if (err.status === 0) {
      errorMessage = `An error occurred: ${err.error}`;
    } else {
      errorMessage = `Server returned: ${err.statusText}, error message is: ${err.error}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
