import { DefinedUsing, MolangSet } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { AnimationCarrier, MolangCarrier } from '../../../../Types/Carrier/Carrier';

/** */
export interface Entity extends Types.BaseObject, MolangCarrier<MolangSet>, AnimationCarrier<DefinedUsing<string>> {
  /** */
  molang: MolangSet;
  /** */
  groups: string[];
  /** */
  events: string[];
  /** */
  families: string[];
  /** */
  animations: DefinedUsing<string>;
}
