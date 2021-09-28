import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet, Using } from "bc-minecraft-molang";
import { MolangCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface Animation extends Types.BaseObject, MolangCarrier<MolangSet> {
  /** */
  molang: MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
