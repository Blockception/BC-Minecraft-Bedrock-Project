import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { AnimationCarrier, MolangCarrier } from "../../../types";
import { References } from "../../../types/references";

/** */
export interface AnimationController
  extends Types.BaseObject,
    MolangCarrier,
    AnimationCarrier<Pick<References, "using">> {
  /** */
  molang: Molang.MolangSet;
  /** */
  animations: Pick<References, "using">;
  /** */
  particles: Pick<References, "using">;
  /** */
  sounds: Pick<References, "using">;
}
