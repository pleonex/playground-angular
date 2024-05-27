import { ICompendiumEntry } from "./compendium-entry";

export interface IEquipment extends ICompendiumEntry {
  properties: IEquipmentProperties;
}

export interface IEquipmentProperties {
  attack: number;
  defense: number;
}
