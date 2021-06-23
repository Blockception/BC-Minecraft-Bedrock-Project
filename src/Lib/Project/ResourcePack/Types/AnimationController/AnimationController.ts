import { MolangSet } from "../../../../Molang/MolangSet";
import { Documentated, Identifiable, Locatable, Using } from "../../../../Types/include";

/** */
export interface AnimationController extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
  /** */
  animations: Using<string>;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
