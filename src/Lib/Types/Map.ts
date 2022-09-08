/** */
export interface Map<T> {
  /** */
  [key: string]: T;
}

/** */
export namespace Map {
  /**
   *
   * @param map
   * @param callbackfn
   */
  export function forEach<T>(map: Record<string, T> | undefined, callbackfn: (value: T, key: string, map: Record<string, T>) => void): void {
    if (!map) return;

    const keys = Object.getOwnPropertyNames(map);

    keys.forEach((k) => {
      const elem = map[k];
      callbackfn(elem, k, map);
    });
  }
}
