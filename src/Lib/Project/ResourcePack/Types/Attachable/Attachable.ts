import { MolangFullSet } from "../../../../Molang/include";
import { DefinedUsing } from "../../../../Types/Defined Using/include";
import { Documentated } from "../../../../Types/Documentated/include";
import { Identifiable } from "../../../../Types/Identifiable/include";
import { Locatable } from "../../../../Types/Locatable/include";

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
