import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export abstract class BaseClient {
  constructor(protected _http: HttpClient)
  {
  }

  protected handleError(err: HttpErrorResponse): Observable<never> {
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
