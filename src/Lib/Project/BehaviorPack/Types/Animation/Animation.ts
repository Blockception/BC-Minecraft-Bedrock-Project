import { MolangSet } from "../../../../Molang/include";
import { Documentated, Identifiable, Locatable } from "../../../../Types/include";

/** */
export interface Animation extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
}
