/** */
export interface Defined<T> {
  /** */
  defined: T[];
}

/** */
export namespace Defined {
  /**
   *
   * @param items
   * @returns
   */
  export function create<T>(items: T[] | undefined = undefined): Defined<T> {
    if (!items) {
      items = [];
    }

    return { defined: [] };
  }

  /**
   *
   * @returns
   */
  export function empty<T>(): Defined<T> {
    return { defined: [] };
  }
}
