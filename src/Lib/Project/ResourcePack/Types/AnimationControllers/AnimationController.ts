import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing, Documentated, Identifiable, Locatable } from "../../../../Types/include";

/** */
export interface AnimationController extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
  /** */
  animations: DefinedUsing<string>;
  /** */
  particles: DefinedUsing<string>;
  /** */
  sounds: DefinedUsing<string>;
}
