import { MolangSet } from "bc-minecraft-molang";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface AnimationController extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  animations: Using<string>;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
