export interface ICompendiumEntry {
  id: number;
  category: string;
  name: string;
  description: string,
  image: string;
  common_locations: string[] | null,
  dlc: boolean,
}
