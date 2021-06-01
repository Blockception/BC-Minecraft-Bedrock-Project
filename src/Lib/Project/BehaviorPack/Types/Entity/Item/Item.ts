import { BlockState } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Types/BehaviorPack/Block";
import { MolangSet } from "../../../../../Molang/MolangSet";
import { DefinedUsing, Identifiable } from "../../../../../Types/include";

export interface Item extends Identifiable {
  molang: MolangSet;
  states: BlockState[];
}
