import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang";
import { MolangSetCarrier } from '../../../../Types/MolangSet/MolangSet';

/** */
export interface Animation extends Types.BaseObject, MolangSetCarrier {
  /** */
  molang: MolangSet;
}
