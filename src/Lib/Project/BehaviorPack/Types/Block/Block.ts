import { Minecraft, Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "../../../../Molang/MolangSet";

/** */
export interface Block extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  states: BlockState[];
}

/** */
export interface BlockState {
  /** */
  name: string;
  /** */
  type: "byte" | "int" | "string";
  /** */
  values: string[];
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
      if (value.type === "byte" || value.type === "int" || value.type === "string") {
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
    const out: BlockState = {
      name: name,
      type: "string",
      values: [],
    };

    const f = typeof values[0];

    switch (f) {
      case "boolean":
        out.type = "byte";
        out.values = values.map((x) => (x === true ? "1" : "0"));
        break;

      case "string":
        out.type = "string";
        out.values = values.map((x) => x.toString());
        break;

      case "number":
        out.type = "int";
        out.values = values.map((x) => x.toString());
        break;
    }

    return out;
  }
}
