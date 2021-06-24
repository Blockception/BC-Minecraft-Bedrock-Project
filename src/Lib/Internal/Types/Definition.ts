/** */
export interface Definition {
  /** */
  [definition: string]: string;
}

/** */
export namespace Definition {
  /**
   *
   * @param id
   * @param container
   * @returns
   */
  export function has(id: string, container: Definition): boolean {
    return typeof container[id] === "string";
  }

  /**
   *
   * @param value
   * @param container
   * @returns
   */
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
   * @returns
   */
  export function get(id: string, container: Definition): string | undefined {
    return container[id];
  }

  /**
   *
   * @param container
   * @param callbackfn
   */
  export function forEach(container: Definition, callbackfn: (value: string, key: string, container: Definition) => void): void {
    const keys = Object.getOwnPropertyNames(container);

    for (let I = 0; I < keys.length; I++) {
      const key = container[I];
      const elem = container[I];
      callbackfn(elem, key, container);
    }
  }
}
