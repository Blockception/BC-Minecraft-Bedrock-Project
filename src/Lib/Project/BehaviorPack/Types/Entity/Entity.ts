import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing, Documentated, Identifiable, Locatable } from "../../../../Types/include";

/**
 *
 */
export interface Entity extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;

  /** */
  groups: string[];
  /** */
  events: string[];
  /** */
  animations: DefinedUsing<string>;
}
