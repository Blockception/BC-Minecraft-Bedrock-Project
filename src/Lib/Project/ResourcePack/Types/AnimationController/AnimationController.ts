import { MolangSet } from "../../../../Molang/MolangSet";
import { Using } from "../../../../Types/Defined Using/include";
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
