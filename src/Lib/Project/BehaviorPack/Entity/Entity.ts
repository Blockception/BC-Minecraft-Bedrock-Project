import { DefinedUsing, Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { AnimationCarrier, MolangCarrier } from "../../../Types";

/** */
export interface Entity extends Types.BaseObject,
    MolangCarrier<Molang.MolangSet>,
    AnimationCarrier<DefinedUsing<string>> {

  /** */
  molang: Molang.MolangSet;
  /** */
  groups: string[];
  /** */
  events: string[];
  /** */
  families: string[];
  /** */
  animations: DefinedUsing<string>;
}
