import { MolangFullSet } from "bc-minecraft-molang";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { MolangCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface RenderController extends Types.BaseObject, MolangCarrier<MolangFullSet> {
  /** */
  molang: MolangFullSet;
}
