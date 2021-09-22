import { DefinedUsing } from "../Types/Defined Using/DefinedUsing";
import { Using } from "../Types/Defined Using/include";
import { Molang } from "./Molang";

/** */
export interface MolangSet {
  /** */
  variables: DefinedUsing<string>;
  /** */
  queries: Using<string>;
}

/** */
export interface MolangFullSet extends MolangSet {
  /** */
  materials: DefinedUsing<string>;
  /** */
  textures: DefinedUsing<string>;
  /** */
  geometries: DefinedUsing<string>;
}

/** */
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
  export function harvest(object: any): MolangSet {
    const out = create();

    Molang.Queries.getUsing(object, out.queries.using);
    Molang.Variables.getUsing(object, out.variables.using);
    Molang.Variables.getDefined(object, out.variables.defined);

    return out;
  }
}

/**
 *
 */
export namespace MolangFullSet {
  /**
   *
   * @returns
   */
  export function create(): MolangFullSet {
    return {
      queries: DefinedUsing.empty(),
      variables: DefinedUsing.empty(),
      geometries: DefinedUsing.empty(),
      materials: DefinedUsing.empty(),
      textures: DefinedUsing.empty(),
    };
  }

  /**Add the necessary properties to the given data set to the full MolangFullSet
   * @param data
   */
  export function upgrade(data: MolangSet): MolangFullSet {
    const out = <MolangFullSet>data;

    if (!DefinedUsing.is<string>(out.geometries)) out.geometries = DefinedUsing.empty();
    if (!DefinedUsing.is<string>(out.materials)) out.materials = DefinedUsing.empty();
    if (!DefinedUsing.is<string>(out.textures)) out.textures = DefinedUsing.empty();

    return out;
  }

  /**
   *
   * @param object
   */
  export function harvest(object: object | string): MolangFullSet {
    const out = create();

    Molang.Queries.getUsing(object, out.queries.using);
    Molang.Variables.getUsing(object, out.variables.using);
    Molang.Variables.getDefined(object, out.variables.defined);

    Molang.Textures.getUsing(object, out.textures.using);
    Molang.Geometries.getUsing(object, out.textures.using);
    Molang.Materials.getUsing(object, out.textures.using);

    return out;
  }

  /**
   *
   * @param value
   */
  export function isEither(value: MolangSet | MolangFullSet): value is MolangFullSet {
    const temp = <MolangFullSet>value;

    if (typeof temp.geometries === "object" && typeof temp.materials === "object" && typeof temp.textures === "object") {
      return true;
    }

    return false;
  }
}
