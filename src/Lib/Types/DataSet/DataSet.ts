import { Types } from "bc-minecraft-bedrock-types";

/**The base of any dataset*/
export interface DataSetBase {
  /**Clears the entire dataset*/
  clear(): void;

  /**Delete the given item key from the location
   * @param key The objects identify key
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  delete(key: string | Types.Identifiable): boolean;

  /**Delete the items that come from the specified file
   * @param uri The filepath uri
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  deleteFile(uri: string): boolean;

  /**Checks if an object with the given id exists
   * @param key The objects identify key
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  has(key: string | Types.Identifiable): boolean;
}

/** */
export class DataSet<T extends Types.Identifiable & Types.Locatable> implements DataSetBase {
  private _data: Map<string, T>;

  /**
   *
   * @param vanilla
   */
  constructor() {
    this._data = new Map<string, T>();
  }

  /** */
  clear(): void {
    this._data.clear();
  }

  /**
   *
   * @param key
   * @returns
   */
  delete(key: string | Types.Identifiable): boolean {
    if (typeof key !== "string") key = key.id;

    return this._data.delete(key);
  }

  /**
   *
   * @param uri
   */
  deleteFile(uri: string): boolean {
    let out = false;

    this._data.forEach((item, key) => {
      if (item.location.uri === uri) {
        this._data.delete(key);
        out = true;
      }
    });

    return out;
  }

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument*/
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    this._data.forEach(callbackfn, thisArg);
  }

  /**
   *
   * @param key
   * @returns
   */
  get(key: string | Types.Identifiable): T | undefined {
    return this._data.get(Types.Identifiable.getId(key));
  }

  /**
   *
   * @param key
   * @returns
   */
  has(key: string | Types.Identifiable): boolean {
    return this._data.has(Types.Identifiable.getId(key));
  }

  /**
   *
   * @param value
   * @returns
   */
  set(value: T | T[] | undefined): this {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((i) => this._data.set(i.id, i));
      } else {
        this._data.set(value.id, value);
      }
    }

    return this;
  }
}
