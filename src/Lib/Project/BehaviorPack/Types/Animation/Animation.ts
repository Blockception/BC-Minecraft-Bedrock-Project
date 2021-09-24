import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang";

/** */
export interface Animation extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
}
