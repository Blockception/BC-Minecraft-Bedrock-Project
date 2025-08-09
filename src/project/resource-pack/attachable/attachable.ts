import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { AnimationCarrier, MolangCarrier } from "../../../types";
import { References } from "../../../types/references";

/** */
export interface Attachable extends Types.BaseObject, MolangCarrier<Molang.MolangSet>, AnimationCarrier<References> {
  /** */
  animations: References;
  /** */
  molang: Molang.MolangSet;
}
