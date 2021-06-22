import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing, Identifiable } from "../../../../Types/include";

export interface AnimationController extends Identifiable {
  molang: MolangSet;
  animations: DefinedUsing<string>;
}
