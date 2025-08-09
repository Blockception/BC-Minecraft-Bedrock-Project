import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { MolangCarrier } from "../../../types/carrier";
import { References } from "../../../types/references";

/** */
export interface Animation extends Types.BaseObject, MolangCarrier<Molang.MolangSet> {
  /** */
  molang: Molang.MolangSet;
  /** */
  particles: Pick<References, "using">;
  /** */
  sounds: Pick<References, "using">;
}
