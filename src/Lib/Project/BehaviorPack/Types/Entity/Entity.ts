import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/Defined Using/include";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface Entity extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;

  /** */
  groups: string[];
  /** */
  events: string[];
  /** */
  animations: DefinedUsing<string>;
}
