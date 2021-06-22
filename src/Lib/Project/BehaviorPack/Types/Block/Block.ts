import { BlockState } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/BehaviorPack/Block";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Documentated, Identifiable, Locatable } from "../../../../Types/include";

/** */
export interface Block extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
  /** */
  states: BlockState[];
}
