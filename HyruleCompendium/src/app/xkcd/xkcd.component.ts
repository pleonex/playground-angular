import { Component, OnDestroy, OnInit } from "@angular/core";
import { XkcdClient } from "./xkcd.client";
import { IXkcdComic } from "./XkcdComic";
import { Subscription } from "rxjs";

@Component({
  selector: "hyrule-xkcd",
  templateUrl: "./xkcd.component.html",
  standalone: true,
})
export class XkcdComponent implements OnInit, OnDestroy {
  private _xkcdSub?: Subscription;

  xkcd?: IXkcdComic;
  xkcdDate?: Date;

  constructor(private _xkcdClient: XkcdClient)
  {
  }

  ngOnInit(): void {
    this._xkcdSub = this._xkcdClient.fetchLatest().subscribe(c => {
      this.xkcd = c;
      this.xkcdDate = new Date(c.year, c.month, c.day);
    });
  }

  ngOnDestroy(): void {
    this._xkcdSub?.unsubscribe();
  }
}
