import { MolangSet } from "../../../../Molang/include";
import { Documentated, Identifiable, Locatable, Using } from "../../../../Types/include";

/** */
export interface Animation extends Identifiable, Documentated, Locatable {
  /** */
  molang: MolangSet;
  /** */
  particles: Using<string>;
  /** */
  sounds: Using<string>;
}
