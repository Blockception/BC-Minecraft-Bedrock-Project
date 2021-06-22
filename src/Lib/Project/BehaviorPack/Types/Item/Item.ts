import { MolangSet } from "../../../../Molang/MolangSet";
import { Identifiable } from "../../../../Types/include";

export interface Item extends Identifiable {
  molang: MolangSet;
}
