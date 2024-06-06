import { ICompendiumEntry } from "./compendium-entry";

export interface IMaterial extends ICompendiumEntry {
  hearts_recovered: number;
  cooking_effect: string;
}
