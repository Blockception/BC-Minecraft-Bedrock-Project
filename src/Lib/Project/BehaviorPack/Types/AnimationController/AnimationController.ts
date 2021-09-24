import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, MolangSet } from "bc-minecraft-molang";

/** */
export interface AnimationController extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  animations: DefinedUsing<string>;
}
