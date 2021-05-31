import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/DefinedUsing";
import { Identifiable } from "../../../../Types/Identifiable";

export interface Entity extends Identifiable {
  molang: MolangSet;

  groups: string[];
  events: string[];
  animations: DefinedUsing<string>;
}
