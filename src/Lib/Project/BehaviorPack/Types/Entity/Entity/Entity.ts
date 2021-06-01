import { MolangSet } from "../../../../../Molang/MolangSet";
import { DefinedUsing, Identifiable } from "../../../../../Types/include";

export interface Entity extends Identifiable {
  molang: MolangSet;

  groups: string[];
  events: string[];
  animations: DefinedUsing<string>;
}
