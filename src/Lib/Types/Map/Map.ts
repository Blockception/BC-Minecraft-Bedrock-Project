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
  export function forEach<T>(map: { [key: string]: T }, callbackfn: (value: T, key: string, map: { [key: string]: T }) => void): void {
    const keys = Object.getOwnPropertyNames(map);

    keys.forEach((k) => {
      const elem = map[k];
      callbackfn(elem, k, map);
    });
  }
}
