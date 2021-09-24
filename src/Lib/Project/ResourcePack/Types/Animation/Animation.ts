import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet, Using } from "bc-minecraft-molang";

/** */
export interface Animation extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
