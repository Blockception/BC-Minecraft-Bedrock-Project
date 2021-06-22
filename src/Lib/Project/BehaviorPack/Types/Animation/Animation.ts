import { MolangSet } from "../../../../Molang/MolangSet";
import { Documentated } from "../../../../Types/Documentated";
import { Identifiable } from "../../../../Types/include";
import { Locatable } from "../../../../Types/Locatable";

/**
 *
 */
export interface Animation extends Identifiable, Documentated, Locatable {
  molang: MolangSet;
}
