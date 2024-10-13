import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, Molang } from "bc-minecraft-molang";
import { AnimationCarrier } from '../../../types/Carrier';

//TODO add events

/** */
export interface AnimationController extends Types.BaseObject, AnimationCarrier<DefinedUsing<string>> {
  /** */
  molang: Molang.MolangSet;
  /** */
  animations: DefinedUsing<string>;
}
