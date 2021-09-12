import { MolangFullSet } from "../../../../Molang/MolangSet";
import { Using } from "../../../../Types/Defined Using/include";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface RenderController extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangFullSet;
}
