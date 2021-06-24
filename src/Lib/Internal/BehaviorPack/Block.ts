import { Map } from "../../Types/Map/Map";
import { FormatVersion } from "../Types/FormatVersion";

export interface Block extends FormatVersion {
  format_version: string;
  "minecraft:block": {
    description: {
      identifier: string;
      register_to_creative_menu?: boolean;
      is_experimental?: boolean;
      properties?: Map<string[] | number[] | boolean[]>;
    };
    permutations?: any[];
    components: Map<any>;
    events?: Map<any>;
  };
}

/** */
export namespace Block {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Block {
    if (value && typeof value.format_version === "string" && typeof value["minecraft:block"] === "object") {
      const b = value["minecraft:block"];

      if (typeof b.description === "object" && typeof b.description.identifier === "string" && typeof b.components === "object") {
        return true;
      }
    }

    return false;
  }
}
