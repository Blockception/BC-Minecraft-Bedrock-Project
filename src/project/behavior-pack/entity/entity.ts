import { Types } from "bc-minecraft-bedrock-types";
import { Molang } from "bc-minecraft-molang";
import { AnimationCarrier, MolangCarrier } from "../../../types";
import { References } from "../../../types/references";
import { EntityProperty } from "./properties";

/** */
export interface Entity extends Types.BaseObject, MolangCarrier, AnimationCarrier<References> {
  /** */
  molang: Molang.MolangSet;
  /** */
  groups: string[];
  /** */
  events: string[];
  /** */
  families: string[];
  /** */
  animations: References;
  /** */
  properties: EntityProperty[];
  /** */
  runtime_identifier: string;
}
