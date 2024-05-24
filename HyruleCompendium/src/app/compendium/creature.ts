export interface ICreature {
  "name": string,           // entry name
  "id": number,             // ID as shown in compendium
  "category": string,       // "creatures"
  "description": string,    // short paragraph
  "image": string,          // URL of image
  "cooking_effect": string | null, // special effect when used in a dish/elixir (e.g. "stamina recovery"), empty if none
  "common_locations": string[] | null, // where the entry is commonly seen
  "edible": boolean,        // true, whether the creature can be eaten or incorporated into a dish/elixir
  "hearts_recovered": number | null; // hearts recovered when eaten raw
  "dlc": boolean            // whether the entry is from a DLC pack
  "drops": string[] | null, // recoverable materials from killing
}
