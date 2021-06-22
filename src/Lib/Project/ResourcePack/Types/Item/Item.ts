import { Identifiable } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/Identifiable";
import { MolangFullSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/DefinedUsing";
import { Documentated } from "../../../../Types/Documentated";
import { Locatable } from "../../../../Types/Locatable";

/**
 *
 */
export interface Entity extends Identifiable, Documentated, Locatable {
  /**
   *
   */
  animations: DefinedUsing<string>;
  /**
   *
   */
  molang: MolangFullSet;
}
