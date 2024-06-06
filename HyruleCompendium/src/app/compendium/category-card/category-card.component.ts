import { Component, Input } from "@angular/core";
import { ICategory } from "../category";
import { Router } from "@angular/router";

@Component({
  selector: "hyrule-category-card",
  templateUrl: "./category-card.component.html",
  styleUrl: "./category-card.component.css",
  standalone: true,
})
export class CategoryCardComponent {
  @Input({required: true}) category: ICategory = null!;

  constructor(private _router: Router)
  {
  }

  onBoxClick(): void {
    this._router.navigate([`/compendium/${this.category.name.toLocaleLowerCase()}`]);
  }
}
