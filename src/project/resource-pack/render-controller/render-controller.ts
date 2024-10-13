import { Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { MolangCarrier } from '../../../types';

/** */
export interface RenderController extends Types.BaseObject, MolangCarrier<Molang.MolangFullSet> {
  /** */
  molang: Molang.MolangFullSet;
}
