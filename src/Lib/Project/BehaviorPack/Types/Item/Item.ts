import { MolangSet } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface Item extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
}
