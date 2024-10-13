/** */
export type SMap<T> = Record<string, T>;

/** */
export namespace SMap {
  /**
   *
   * @param map
   * @param callbackfn
   */
  export function forEach<T>(
    map: SMap<T> | undefined,
    callbackfn: (value: T, key: string, map: Record<string, T>) => void
  ): void {
    if (!map) return;

    const keys = Object.getOwnPropertyNames(map);

    keys.forEach((k) => {
      const elem = map[k];
      callbackfn(elem, k, map);
    });
  }
}
