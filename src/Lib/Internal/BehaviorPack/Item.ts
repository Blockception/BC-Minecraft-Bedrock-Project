import { Map } from "../../Types/Map/Map";
import { FormatVersion } from "../Types/FormatVersion";

export interface Item extends FormatVersion {
  format_version: string;
  "minecraft:item": {
    description: {
      identifier: string;
      category?: string;
      is_experimental?: boolean;
    };
    components: Map<any>;
    events?: Map<any>;
  };
}

/** */
export namespace Item {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Item {
    if (value && typeof value.format_version === "string" && typeof value["minecraft:item"] === "object") {
      const b = value["minecraft:item"];

      if (typeof b.description === "object" && typeof b.description.identifier === "string" && typeof b.components === "object") {
        return true;
      }
    }

    return false;
  }
}
