import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { AnimationCarrier, MolangCarrier } from "../../../types";
import { References } from "../../../types/references";

/** */
export interface Entity extends Types.BaseObject, MolangCarrier, AnimationCarrier<References> {
  /** */
  animations: References;
  /** */
  molang: Molang.MolangSet;
}
