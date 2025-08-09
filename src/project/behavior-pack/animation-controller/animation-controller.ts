import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { AnimationCarrier } from "../../../types";
import { References } from "../../../types/references";

/** */
export interface AnimationController extends Types.BaseObject, AnimationCarrier<References> {
  /** */
  molang: Molang.MolangSet;
  /** */
  animations: References;
  /** */
  events: string[];
}
