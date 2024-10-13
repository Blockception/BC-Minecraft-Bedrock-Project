import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, Molang } from "bc-minecraft-molang";
import { AnimationCarrier, MolangCarrier } from '../../../types';

/** */
export interface Entity extends Types.BaseObject, MolangCarrier<Molang.MolangFullSet>, AnimationCarrier<DefinedUsing<string>> {
  /** */
  animations: DefinedUsing<string>;
  /** */
  molang: Molang.MolangFullSet;
}
