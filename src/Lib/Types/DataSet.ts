import { Container } from "./Container";
import { Identifiable } from "./Identifiable";
import { VanillaConnector } from "./VanillaConnector";

/**
 *
 */
export interface DataSet<T extends Identifiable, U> {
  /**
   *
   */
  clear(): void;

  /**
   *
   * @param key
   * @returns
   */
  delete(key: string | Identifiable): boolean;

  /**
   *
   * @param callbackfn
   * @param thisArg
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
export interface DataSetSingle<T extends Identifiable> extends DataSet<T, T> {}

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
  export function create<T extends Identifiable>(): DataSetSingle<T> {
    return new DataSetUnconnected<T>();
  }

  /**
   *
   * @param vanilla
   * @param edu
   * @param Container
   * @returns
   */
  export function createID<T extends Identifiable, U extends Identifiable>(vanilla: U[], edu: U[], Container: Container): DataSetConnected<T, U> {
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
  export function createString<T extends Identifiable>(vanilla: string[], edu: string[], Container: Container): DataSetConnected<T, string> {
    const conn = VanillaConnector.createString(vanilla, edu, Container);

    return new DataSetConnected<T, string>(conn);
  }
}

/**
 *
 */
export class DataSetConnected<T extends Identifiable, U> implements DataSet<T, U> {
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
export class DataSetUnconnected<T extends Identifiable> implements DataSet<T, T> {
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
