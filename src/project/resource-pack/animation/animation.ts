import { Types } from "bc-minecraft-bedrock-types";
import { Molang, Using } from "bc-minecraft-molang";
import { MolangCarrier } from '../../../types/Carrier';

/** */
export interface Animation extends Types.BaseObject, MolangCarrier<Molang.MolangSet> {
  /** */
  molang: Molang.MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
