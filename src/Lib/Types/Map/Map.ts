export interface Map<T> {
  [key: string]: T;
}

export namespace Map {
  export function forEach<T>(map: { [key: string]: T }, callbackfn: (value: T, key: string, map: { [key: string]: T }) => void): void {
    const keys = Object.getOwnPropertyNames(map);

    keys.forEach((k) => callbackfn(map[k], k, map));
  }
}
