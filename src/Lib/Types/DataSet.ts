import { Container } from "./Container";
import { Identifiable } from "./Identifiable";
import { Locatable } from "./Locatable";
import { VanillaConnector } from "./VanillaConnector";

/**
 *
 */
export interface DataSet<T extends Identifiable & Locatable, U> {
  /**Clears the entire dataset*/
  clear(): void;

  /**Delete the given item key from the location
   * @param key The objects identify key
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  delete(key: string | Identifiable): boolean;

  /**Delete the items that come from the specified file
   * @param uri The filepath uri*/
  deleteFile(uri: string): boolean;

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument
   */
  forEach(callbackfn: (value: T) => void, thisArg?: any): void;

  /**
   *
   * @param key
   * @returns
   */
  get(key: string | Identifiable): T | U | undefined;

  /**
   *
   * @param key
   * @returns
   */
  has(key: string | Identifiable): boolean;

  /**
   *
   * @param value
   * @returns
   */
  set(value: T): this;
}

/**
 *
 */
export interface DataSetSingle<T extends Identifiable & Locatable> extends DataSet<T, T> {}

/**
 *
 */
export namespace DataSet {
  /**
   *
   * @param vanilla
   * @param edu
   * @param Container
   * @returns
   */
  export function create<T extends Identifiable & Locatable>(): DataSetSingle<T> {
    return new DataSetUnconnected<T>();
  }

  /**
   *
   * @param vanilla
   * @param edu
   * @param Container
   * @returns
   */
  export function createID<T extends Identifiable & Locatable, U extends Identifiable>(vanilla: U[], edu: U[], Container: Container): DataSetConnected<T, U> {
    const conn = VanillaConnector.createID<U>(vanilla, edu, Container);

    return new DataSetConnected<T, U>(conn);
  }

  /**
   *
   * @param vanilla
   * @param edu
   * @param Container
   * @returns
   */
  export function createString<T extends Identifiable & Locatable>(vanilla: string[], edu: string[], Container: Container): DataSetConnected<T, string> {
    const conn = VanillaConnector.createString(vanilla, edu, Container);

    return new DataSetConnected<T, string>(conn);
  }
}

/**
 *
 */
export class DataSetConnected<T extends Identifiable & Locatable, U> implements DataSet<T, U> {
  private _data: Map<string, T>;
  private _vanilla: VanillaConnector<U>;

  /**
   *
   * @param vanilla
   */
  constructor(vanilla: VanillaConnector<U>) {
    this._data = new Map<string, T>();
    this._vanilla = vanilla;
  }

  /**
   *
   */
  clear(): void {
    this._data.clear();
  }

  /**
   *
   * @param key
   * @returns
   */
  delete(key: string | Identifiable): boolean {
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

  /**
   *
   * @param callbackfn
   * @param thisArg
   */
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    this._data.forEach(callbackfn, thisArg);
  }

  /**
   *
   * @param key
   * @returns
   */
  get(key: string | Identifiable): T | U | undefined {
    if (typeof key !== "string") key = key.id;

    let out: T | U | undefined = this._data.get(key);
    if (!out) out = this._vanilla.get(key);

    return out;
  }

  /**
   *
   * @param key
   * @returns
   */
  has(key: string | Identifiable): boolean {
    if (typeof key !== "string") key = key.id;

    if (this._data.has(key)) return true;

    return this._vanilla.has(key);
  }

  /**
   *
   * @param value
   * @returns
   */
  set(value: T): this {
    this._data.set(value.id, value);

    return this;
  }
}

/**
 *
 */
export class DataSetUnconnected<T extends Identifiable & Locatable> implements DataSetSingle<T> {
  private _data: Map<string, T>;

  /**
   *
   * @param vanilla
   */
  constructor() {
    this._data = new Map<string, T>();
  }

  /**
   *
   */
  clear(): void {
    this._data.clear();
  }

  /**
   *
   * @param key
   * @returns
   */
  delete(key: string | Identifiable): boolean {
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

  /**
   *
   * @param callbackfn
   * @param thisArg
   */
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    this._data.forEach(callbackfn, thisArg);
  }

  /**
   *
   * @param key
   * @returns
   */
  get(key: string | Identifiable): T | undefined {
    if (typeof key !== "string") key = key.id;

    return this._data.get(key);
  }

  /**
   *
   * @param key
   * @returns
   */
  has(key: string | Identifiable): boolean {
    if (typeof key !== "string") key = key.id;

    return this._data.has(key);
  }

  /**
   *
   * @param value
   * @returns
   */
  set(value: T): this {
    this._data.set(value.id, value);

    return this;
  }
}
