import { MolangSet } from "../../../../Molang/MolangSet";
import { Using } from "../../../../Types/Defined Using/include";
import { Documentated } from "../../../../Types/Documentated/include";
import { Identifiable } from "../../../../Types/Identifiable/include";
import { Locatable } from "../../../../Types/Locatable/include";

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
