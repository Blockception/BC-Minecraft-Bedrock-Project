import { Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { MolangCarrier } from "../../../types";

/** */
export interface Item extends Types.BaseObject, MolangCarrier {
  /** */
  molang: Molang.MolangSet;
  /** */
  isFood: boolean;
}
