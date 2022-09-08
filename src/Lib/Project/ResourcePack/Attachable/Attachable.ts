import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, Molang } from "bc-minecraft-molang";
import { MolangCarrier, AnimationCarrier } from '../../../Types';

/** */
export interface Attachable extends Types.BaseObject, MolangCarrier<Molang.MolangFullSet>, AnimationCarrier<DefinedUsing<string>> {
  /** */
  animations: DefinedUsing<string>;
  /** */
  molang: Molang.MolangFullSet;
}
