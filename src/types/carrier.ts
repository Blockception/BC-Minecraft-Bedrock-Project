import { MolangSet } from "bc-minecraft-molang/lib/src/molang";

/**
 *
 */
export interface AnimationCarrier<T> {
  /**
   *
   */
  animations: T;
}

/**
 *
 */
export interface MolangCarrier {
  /**
   *
   */
  molang: MolangSet;
}
