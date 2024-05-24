import { Component } from "@angular/core";
import { XkcdComponent } from "../xkcd/xkcd.component";
import { TechyComponent } from "../techy/techy.component";

@Component({
    selector: "hyrule-home",
    templateUrl: "./home.component.html",
    standalone: true,
    imports: [XkcdComponent, TechyComponent]
})
export class HomeComponent {

}
