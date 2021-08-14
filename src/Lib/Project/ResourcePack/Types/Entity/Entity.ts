import { MolangFullSet } from "../../../../Molang/include";
import { DefinedUsing } from "../../../../Types/Defined Using/include";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface Entity extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  animations: DefinedUsing<string>;
  /** */
  molang: MolangFullSet;
}
