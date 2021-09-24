import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, MolangFullSet } from "bc-minecraft-molang";

/** */
export interface Attachable extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  animations: DefinedUsing<string>;
  /** */
  molang: MolangFullSet;
}
