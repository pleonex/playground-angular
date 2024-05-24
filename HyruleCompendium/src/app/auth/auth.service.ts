import { Injectable } from "@angular/core";
import { IUser } from "./user";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _currentUserSubject = new BehaviorSubject<IUser | null>(null);

  currentUser: IUser | null = null;
  currentUser$ = this._currentUserSubject.asObservable();

  constructor()
  {
    const userJson = window.localStorage.getItem("user");
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
      this._currentUserSubject.next(this.currentUser);
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): boolean {
    if (userName === "link" && password === "21/02/1986") {
      this.currentUser = {
        id: 1,
        userName: userName,
        fullName: "Hero of Time",
        roles: ["admin"],
      };
      window.localStorage.setItem("user", JSON.stringify(this.currentUser));

      this._currentUserSubject.next(this.currentUser);
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser = null;
    window.localStorage.removeItem("user");
    this._currentUserSubject.next(null);
  }
}
