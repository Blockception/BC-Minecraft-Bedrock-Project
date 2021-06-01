import { BlockState } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/BehaviorPack/Block";
import { MolangSet } from "../../../../../Molang/MolangSet";
import { Identifiable } from "../../../../../Types/include";

export interface Block extends Identifiable {
  molang: MolangSet;
  states: BlockState[];
}
