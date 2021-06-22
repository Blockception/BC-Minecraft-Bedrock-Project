import { MolangSet } from "../../../../Molang/MolangSet";
import { Documentated } from "../../../../Types/Documentated";
import { DefinedUsing, Identifiable } from "../../../../Types/include";
import { Locatable } from "../../../../Types/Locatable";

export interface AnimationController extends Identifiable, Documentated, Locatable {
  molang: MolangSet;
  animations: DefinedUsing<string>;
}
