import { MolangSet } from "../../../../Molang/include";
import { Using } from "../../../../Types/Defined Using/include";
import { Documentated } from "../../../../Types/Documentated/include";
import { Identifiable } from "../../../../Types/Identifiable/include";
import { Locatable } from "../../../../Types/Locatable/include";

/** */
export interface Animation extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
