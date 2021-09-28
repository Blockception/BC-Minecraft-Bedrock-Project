import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, MolangFullSet } from "bc-minecraft-molang";
import { MolangCarrier, AnimationCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface Entity extends Types.BaseObject, MolangCarrier<MolangFullSet>, AnimationCarrier<DefinedUsing<string>> {
  /** */
  animations: DefinedUsing<string>;
  /** */
  molang: MolangFullSet;
}
