import { ICompendiumEntry } from "./compendium-entry";

export interface IMonster extends ICompendiumEntry {
  drops: string[];
}
