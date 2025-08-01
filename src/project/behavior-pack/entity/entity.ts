import { DefinedUsing, Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { AnimationCarrier, MolangCarrier } from "../../../types";
import { EntityProperty } from './properties';

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
  /** */
  properties: EntityProperty[];
  /** */
  runtime_identifier: string;
}
