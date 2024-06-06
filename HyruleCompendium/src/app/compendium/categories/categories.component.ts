import { Component } from "@angular/core";
import { CategoryCardComponent } from "../category-card/category-card.component";
import { ICategory } from "../category";
import { CategorySearchComponent } from "../category-search/category-search.component";

@Component({
  selector: "hyrule-categories",
  templateUrl: "./categories.component.html",
  standalone: true,
  imports: [CategoryCardComponent, CategorySearchComponent]
})
export class CategoriesComponent {
  categories: ICategory[] = [
    {
      name: "Creatures",
      description: "Animals: bird, fish, insect, horse.",
      image: "categories/creatures.png"
    },
    {
      name: "Equipment",
      description: "Battle-tested weapon, such as a sword, spear, or bow.",
      image: "categories/equipment.png"
    },
    {
      name: "Materials",
      description: "Cooking ingredient, such as an apple or a mushroom",
      image: "categories/materials.png"
    },
    {
      name: "Monsters",
      description: "Monsters that can be found in Hyrule.",
      image: "categories/monsters.png"
    },
    {
      name: "Treasure",
      description: "Exciting subject, such as a treasure chest or ore.",
      image: "categories/treasures.png",
    },
  ];
}
