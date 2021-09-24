import { DefinedUsing, MolangSet } from "bc-minecraft-molang";
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
  families: string[];
  /** */
  animations: DefinedUsing<string>;
}
