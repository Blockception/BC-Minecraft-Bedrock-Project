import { Molang } from "bc-minecraft-molang";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { AnimationCarrier, MolangCarrier } from "../../../Types";

/** */
export interface AnimationController
  extends Types.BaseObject,
    MolangCarrier<Molang.MolangSet>,
    AnimationCarrier<Using<string>> {
  /** */
  molang: Molang.MolangSet;
  /** */
  animations: Using<string>;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
