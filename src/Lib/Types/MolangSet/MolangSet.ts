import { MolangFullSet, MolangSet } from 'bc-minecraft-molang';

/** */
export interface MolangSetCarrier {
  /** */
  molang : MolangSet;
}

export namespace MolangSetCarrier {
  export function is(value : any) : value is MolangSetCarrier {
    if (typeof value === "object") {
      return typeof value.molang === "object";
    }

    return false;
  }
}

/** */
export interface MolangFullSetCarrier {
  /** */
  molang : MolangFullSet;
}

export namespace MolangFullSetCarrier {
  export function is(value : any) : value is MolangFullSetCarrier {
    if (typeof value === "object") {
      return typeof value.molang === "object";
    }

    return false;
  }
}