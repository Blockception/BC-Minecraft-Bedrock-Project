import { Map } from "../../Types/Map/Map";

/** */
export interface Definition extends Map<string> {}

/** */
export namespace Definition {
  /**
   *
   * @param map
   * @param callbackfn
   */
  export function forEach(map: Definition, callbackfn: (value: string, key: string, map: Definition) => void): void {
    Map.forEach(map, callbackfn);
  }

  /**
   *
   * @param id
   * @param container
   * @returns*/
  export function has(id: string, container: Definition): boolean {
    return typeof container[id] === "string";
  }

  /**
   *
   * @param value
   * @param container
   * @returns*/
  export function uses(value: string, container: Definition): boolean {
    const keys = Object.getOwnPropertyNames(container);

    for (let I = 0; I < keys.length; I++) {
      if (container[keys[I]] === value) return true;
    }

    return false;
  }

  /**
   *
   * @param id
   * @param container
   * @returns*/
  export function get(id: string, container: Definition): string | undefined {
    return container[id];
  }
}
