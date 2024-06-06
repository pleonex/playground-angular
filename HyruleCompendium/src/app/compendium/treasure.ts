import { ICompendiumEntry } from "./compendium-entry";

export interface ITreasure extends ICompendiumEntry {
  drops: string[];
}
