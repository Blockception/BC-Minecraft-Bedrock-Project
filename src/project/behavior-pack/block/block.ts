import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { MolangCarrier } from "../../../types";
import { BlockState } from "./BlockState";

/** */
export interface Block extends Types.BaseObject, MolangCarrier<Molang.MolangSet> {
  /** */
  molang: Molang.MolangSet;
  /** */
  states: BlockState[];
}
