/** */
export interface Using<T> {
  /** */
  using: T[];
}

/** */
export namespace Using {
  /**
   *
   * @param items
   * @returns
   */
  export function create<T>(items: T[] | undefined = undefined): Using<T> {
    if (!items) {
      items = [];
    }

    return { using: [] };
  }

  /**
   *
   * @returns
   */
  export function empty<T>(): Using<T> {
    return { using: [] };
  }
}
