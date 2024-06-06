import { Component, OnDestroy, OnInit } from "@angular/core";
import { XkcdComponent } from "../xkcd/xkcd.component";
import { TechyComponent } from "../techy/techy.component";
import { IUser } from "../auth/user";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "hyrule-home",
    templateUrl: "./home.component.html",
    standalone: true,
    imports: [XkcdComponent, TechyComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
  private _statusSub?: Subscription;

  loggedUser: IUser | null = null;

  constructor(private _authService: AuthService)
  {
  }

  ngOnInit(): void {
    this._statusSub = this._authService.currentUser$.subscribe(
      v => this.loggedUser = v);
  }

  ngOnDestroy(): void {
    this._statusSub?.unsubscribe();
  }
}
