import { Types } from "bc-minecraft-bedrock-types";
import { DataSet } from "./DataSet";

/**
 *
 */
export class DataSetConnector<T extends Types.Identifiable & Types.Locatable> {
  private _get: (index: number) => DataSet<T> | undefined;
  private _count: () => number;

  /**
   *
   * @param get
   * @param count
   */
  constructor(count: () => number, get: (index: number) => DataSet<T> | undefined) {
    this._count = count;
    this._get = get;
  }

  /**
   *
   * @param id
   * @returns
   */
  get(id: string): T | undefined {
    const max = this._count();

    for (let I = 0; I < max; I++) {
      const p = this._get(I);

      const item = p?.get(id);
      if (item) return item;
    }

    return undefined;
  }

  /**
   *
   * @param id
   * @returns
   */
  has(id: string): boolean {
    return this.get(id) !== undefined;
  }

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument*/
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    const max = this._count();

    for (let I = 0; I < max; I++) {
      const p = this._get(I);
      p?.forEach(callbackfn, thisArg);
    }
  }
}
