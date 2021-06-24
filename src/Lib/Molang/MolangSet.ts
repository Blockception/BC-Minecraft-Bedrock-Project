import { DefinedUsing } from "../Types/Defined Using/DefinedUsing";
import { Using } from "../Types/Defined Using/include";
import { Molang } from "./Molang";

/**
 *
 */
export interface MolangSet {
  /**
   *
   */
  variables: DefinedUsing<string>;
  /**
   *
   */
  queries: Using<string>;
}

/**
 *
 */
export interface MolangFullSet extends MolangSet {
  /**
   *
   */
  materials: DefinedUsing<string>;
  /**
   *
   */
  textures: DefinedUsing<string>;
  /**
   *
   */
  geometries: DefinedUsing<string>;
}

/**
 *
 */
export namespace MolangSet {
  /**
   *
   * @returns
   */
  export function create(): MolangSet {
    return {
      queries: DefinedUsing.create<string>(),
      variables: DefinedUsing.create<string>(),
    };
  }

  /**
   *
   * @param object
   * @returns
   */
  export function harvest(object: object | string): MolangSet {
    const out = create();

    internalHarvest(object, out);

    return out;
  }

  /**
   *
   * @param object
   * @param receiver
   */
  function internalHarvest(object: any, receiver: MolangSet): void {
    switch (typeof object) {
      case "string":
        Molang.Queries.getUsing(object, receiver.queries.using);
        Molang.Variables.getUsing(object, receiver.variables.using);
        Molang.Variables.getDefined(object, receiver.variables.defined);
        break;

      case "object":
        if (Array.isArray(object)) {
          for (let I = 0; I < object.length; I++) {
            const elemt = object[I];
            internalHarvest(elemt, receiver);
          }
        } else {
          const keys = Object.getOwnPropertyNames(object);

          for (let I = 0; I < keys.length; I++) {
            const elemt = object[I];
            internalHarvest(elemt, receiver);
          }
        }
        break;

      default:
        break;
    }
  }
}
