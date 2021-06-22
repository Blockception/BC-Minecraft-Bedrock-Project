import { MolangFullSet } from "../../../../Molang/include";
import { DefinedUsing, Documentated, Identifiable, Locatable } from "../../../../Types/include";

/**
 *
 */
export interface Attachable extends Identifiable, Documentated, Locatable {
  /**
   *
   */
  animations: DefinedUsing<string>;
  /**
   *
   */
  molang: MolangFullSet;
}
