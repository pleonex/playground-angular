import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { BaseClient } from "../base.client";

@Injectable({
  providedIn: "root",
})
export class TechyClient extends BaseClient {
  private readonly _apiUri = "/api/techy";

  constructor(http: HttpClient)
  {
    super(http);
  }

  fetch(): Observable<string> {
    return this._http.get(this._apiUri, {responseType: "text"}).pipe(
        catchError(this.handleError),
      );
  }
}
