import { MolangSet } from "../../../../Molang/include";
import { DefinedUsing, Documentated, Identifiable, Locatable } from "../../../../Types/include";

/** */
export interface Animation extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
  /** */
  particles: DefinedUsing<string>;
  /** */
  sounds: DefinedUsing<string>;
}
