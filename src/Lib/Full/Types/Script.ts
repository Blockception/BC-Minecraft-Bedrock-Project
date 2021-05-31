import { MolangSet } from "../../Molang/MolangSet";
import { Conditional } from "./Conditional";
import { Definition } from "./Definition";

export interface Script {
  animate?: Conditional[];
  initialize?: string[];
  pre_animation?: string[];
  variables?: Definition;
}

export interface ScriptContainer {
  scripts?: Script;
  animations?: Definition;
}

export namespace ScriptContainer {
  export function getMolang(data: ScriptContainer): MolangSet {
    const out = MolangSet.create();

    return out;
  }
}
