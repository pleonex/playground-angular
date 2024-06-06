import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { IUser } from "../auth/user";

@Component({
  selector: "hyrule-menu",
  templateUrl: "./menu.component.html",
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class MenuComponent implements OnInit, OnDestroy {
  private _statusSub?: Subscription;

  title = 'Hyrule Compendium';
  isBurgerMenuVisible = false;
  loggedUser: IUser | null = null;

  constructor(
    private _authService: AuthService,
    private _router: Router)
  {
  }

  ngOnInit(): void {
    this._statusSub = this._authService.currentUser$.subscribe(
      v => this.loggedUser = v);
  }

  ngOnDestroy(): void {
    this._statusSub?.unsubscribe();
  }

  onBurgerClick(): void {
    this.isBurgerMenuVisible = !this.isBurgerMenuVisible;
  }

  onLogoutClick(): void {
    this._authService.logout();
    this._router.navigate(["/login"]);
  }
}
