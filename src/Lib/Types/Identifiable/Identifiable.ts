import { Types } from "bc-minecraft-bedrock-vanilla-data";

/**The interface that governs if a object is identifiable*/
export interface Identifiable extends Types.Identifiable {
  /**The identifier of this object*/
  id: string;
}

/** */
export namespace Identifiable {
  /**
   *
   * @param items
   * @param id
   * @returns
   */
  export function has<T extends Identifiable>(items: T[], id: string): boolean {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id == id) return true;
    }

    return false;
  }

  /**
   *
   * @param items
   * @param id
   * @returns
   */
  export function get<T extends Identifiable>(items: T[], id: string): T | undefined {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id == id) return elem;
    }

    return undefined;
  }
}
