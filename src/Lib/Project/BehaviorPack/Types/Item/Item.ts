import { MolangSet } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { MolangCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface Item extends Types.BaseObject, MolangCarrier<MolangSet> {
  /** */
  molang: MolangSet;
}
