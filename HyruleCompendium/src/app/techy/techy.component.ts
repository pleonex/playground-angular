import { Component, OnDestroy, OnInit } from "@angular/core";
import { TechyClient } from "./techy.client";
import { Subscription } from "rxjs";

@Component({
  selector: "hyrule-techy",
  templateUrl: "./techy.component.html",
  standalone: true,
})
export class TechyComponent implements OnInit, OnDestroy {
  private _techySub?: Subscription;

  techyMessage = "";

  constructor(private _techyClient: TechyClient)
  {
  }

  ngOnInit(): void {
    this._techySub = this._techyClient.fetch().subscribe(m =>
      this.techyMessage = m);
  }

  ngOnDestroy(): void {
    this._techySub?.unsubscribe();
  }
}
