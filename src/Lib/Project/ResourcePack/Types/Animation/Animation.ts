import { MolangSet } from "../../../../Molang/include";
import { Using } from "../../../../Types/Defined Using/include";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface Animation extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
