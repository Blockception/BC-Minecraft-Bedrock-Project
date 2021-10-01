import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, MolangSet } from "bc-minecraft-molang";
import { AnimationCarrier } from '../../../../Types/Carrier/Carrier';

//TODO add events

/** */
export interface AnimationController extends Types.BaseObject, AnimationCarrier<DefinedUsing<string>> {
  /** */
  molang: MolangSet;
  /** */
  animations: DefinedUsing<string>;
}
