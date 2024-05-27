import { Component, Input } from "@angular/core";
import { ICreature } from "./creature";
import { Subscription } from "rxjs";
import { CompendiumClient } from "./compendium.client";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "hyrule-creatures-details",
  templateUrl: "./creatures-details.component.html",
  standalone: true,
  imports: [TitleCasePipe]
})
export class CreaturesDetailsComponent {
  private _subFetch?: Subscription;
  private _selectedId: number | undefined;
  private _creatures: ICreature[] = [];

  creature?: ICreature;

  get selectedId(): number | undefined {
    return this._selectedId;
  }
  @Input() set selectedId(id: number | undefined) {
    this._selectedId = id;
    if (this._creatures) {
      this.creature = this._creatures.find(c => c.id == this.selectedId);
    }
  }

  constructor(private _client: CompendiumClient) {
  }

  ngOnInit(): void {
    this._subFetch = this._client.fetchCreatures().subscribe(d => {
      this._creatures = d;
      if (this.selectedId) {
        this.creature = this._creatures.find(c => c.id == this.selectedId);
      }
    });
  }

  ngOnDestroy(): void {
    this._subFetch?.unsubscribe();
  }

}
