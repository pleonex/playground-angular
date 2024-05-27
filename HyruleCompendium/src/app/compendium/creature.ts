import { ICompendiumEntry } from "./compendium-entry";

export interface ICreature extends ICompendiumEntry {
  "cooking_effect": string | null, // special effect when used in a dish/elixir (e.g. "stamina recovery"), empty if none
  "edible": boolean,        // true, whether the creature can be eaten or incorporated into a dish/elixir
  "hearts_recovered": number | null; // hearts recovered when eaten raw
  "drops": string[] | null, // recoverable materials from killing
}
