import { MolangSet } from "bc-minecraft-molang";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { AnimationCarrier, MolangCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface AnimationController extends Types.BaseObject, MolangCarrier<MolangSet>, AnimationCarrier<Using<string>> {
  /** */
  molang: MolangSet;
  /** */
  animations: Using<string>;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
