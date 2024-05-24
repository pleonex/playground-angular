import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { ICreature } from "./creature";
import { CompendiumClient } from "./compendium.client";

@Injectable({
  providedIn: 'root',
})
export class CreaturesParams implements OnDestroy {
  private _selectedCreature = new BehaviorSubject<ICreature | null>(null);
  private _sub?: Subscription;

  selectedCreature$ = this._selectedCreature.asObservable();

  constructor(private _client: CompendiumClient) {
  }

  setSelection(value: ICreature | null): void {
    this._selectedCreature.next(value);
  }

  setSelectionId(value: number | null): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }

    this._sub = this._client.fetchCreatures().subscribe(d => {
        const creature = d.data.find(c => c.id == value);
        this._selectedCreature.next(creature ?? null);
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
