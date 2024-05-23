import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "hyrule-caterror",
  templateUrl: "./caterror.component.html",
  standalone: true,
})
export class CatErrorComponent implements OnInit {
  errorCode: Number = 404;
  errorUrl: string = "";

  constructor(private _route: ActivatedRoute)
  {
  }

  ngOnInit(): void {
    this.errorCode = Number(this._route.snapshot.paramMap.get("id")) ?? 404;
    this.errorUrl = `https://http.cat/${this.errorCode}`;
  }
}
