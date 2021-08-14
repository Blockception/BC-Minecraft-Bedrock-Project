import { MolangSet } from "../../../../Molang/include";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface Animation extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
}
