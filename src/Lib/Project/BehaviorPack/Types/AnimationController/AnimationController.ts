import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, MolangSet } from "bc-minecraft-molang";
import { MolangSetCarrier } from '../../../../Types/MolangSet/MolangSet';

/** */
export interface AnimationController extends Types.BaseObject, MolangSetCarrier {
  /** */
  molang: MolangSet;
  /** */
  animations: DefinedUsing<string>;
}
