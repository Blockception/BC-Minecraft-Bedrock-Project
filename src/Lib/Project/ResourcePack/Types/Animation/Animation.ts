import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet, Using } from "bc-minecraft-molang";

/** */
export interface Animation extends Types.BaseObject {
  /** */
  molang: MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
