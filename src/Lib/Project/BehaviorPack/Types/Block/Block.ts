import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "../../../../Molang/MolangSet";

/** */
export interface Block extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  states: BlockState[];
}

/** */
export type BlockState = BlockStateString | BlockStateNumber | BlockStateBoolean;

/** */
export interface BlockStateString {
  /** */
  name: string;
  /** */
  type: "string";
  /** */
  values: string[];
}

/** */
export interface BlockStateNumber {
  /** */
  name: string;
  /** */
  type: "number";
  /** */
  values: number[];
}

/** */
export interface BlockStateBoolean {
  /** */
  name: string;
  /** */
  type: "boolean";
  /** */
  values: boolean[];
}

/** */
export namespace BlockState {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is BlockState {
    if (value && typeof value.name === "string" && typeof value.type === "string") {
      if (value.type === "string" || value.type === "boolean" || value.type === "number") {
        if (Array.isArray(value.values)) return true;
      }
    }

    return false;
  }

  /**
   *
   * @param name
   * @param values
   * @returns
   */
  export function create(name: string, values: string[] | number[] | boolean[]): BlockState | undefined {
    const f = values[0];

    switch (typeof f) {
      case "string":
        return { name: name, type: "string", values: <string[]>(<unknown[]>values) };

      case "number":
        return { name: name, type: "number", values: <number[]>(<unknown[]>values) };

      case "boolean":
        return { name: name, type: "boolean", values: <boolean[]>(<unknown[]>values) };
    }

    return undefined;
  }
}
