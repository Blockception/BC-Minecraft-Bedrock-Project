import { MolangSet } from "../../../../Molang/MolangSet";
import { Documentated } from "../../../../Types/Documentated";
import { DefinedUsing, Identifiable } from "../../../../Types/include";
import { Locatable } from "../../../../Types/Locatable";

export interface Entity extends Identifiable, Documentated, Locatable {
  molang: MolangSet;

  groups: string[];
  events: string[];
  animations: DefinedUsing<string>;
}
