import { MolangFullSet } from "bc-minecraft-molang";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface RenderController extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangFullSet;
}
