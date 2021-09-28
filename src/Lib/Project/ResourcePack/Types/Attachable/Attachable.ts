import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, MolangFullSet, MolangSet } from "bc-minecraft-molang";
import { MolangCarrier, AnimationCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface Attachable extends Types.BaseObject, MolangCarrier<MolangFullSet>, AnimationCarrier<DefinedUsing<string>> {
  /** */
  animations: DefinedUsing<string>;
  /** */
  molang: MolangFullSet;
}
