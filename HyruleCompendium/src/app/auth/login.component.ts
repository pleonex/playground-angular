import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./login.component.html",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _sub?: Subscription;

  redirectUrl: string = "";
  loginForm = new FormGroup({
    userName: new FormControl("link"),
    password: new FormControl("21/02/1986"),
  });

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit(): void {
    this._sub = this._route.queryParams.subscribe(v => {
      this.redirectUrl = v["redirectUrl"] ?? "/";

      // attempt to prevent re-directions to other sites
      if (this.redirectUrl.startsWith("http")) {
        this._router.navigate(["/error/418"]);
      }

      if (this._authService.isLoggedIn()) {
        this._router.navigate([this.redirectUrl]);
      }
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  login(): void {
    const success = this._authService.login(
      this.loginForm.value.userName ?? "",
      this.loginForm.value.password ?? "");
    if (success) {
      this._router.navigate([this.redirectUrl]);
    }
  }
}
