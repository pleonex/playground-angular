import { Component } from "@angular/core";
import { XkcdComponent } from "../xkcd/xkcd.component";

@Component({
  selector: "hyrule-home",
  templateUrl: "./home.component.html",
  standalone: true,
  imports: [XkcdComponent]
})
export class HomeComponent {

}
