import { Container } from "./Container";
import { Identifiable } from "./Identifiable";
import { VanillaConnector } from "./VanillaConnector";

/**
 *
 */
export class DataSet<T extends Identifiable, U> {
  private _data: Map<string, T>;
  private _vanilla: VanillaConnector<U>;

  constructor(vanilla: VanillaConnector<U>) {
    this._data = new Map<string, T>();
    this._vanilla = vanilla;
  }

  clear(): void {
    this._data.clear();
  }

  delete(key: string | Identifiable): boolean {
    if (typeof key !== "string") key = key.id;

    return this._data.delete(key);
  }

  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    this._data.forEach(callbackfn, thisArg);
  }

  get(key: string | Identifiable): T | U | undefined {
    if (typeof key !== "string") key = key.id;

    let out: T | U | undefined = this._data.get(key);
    if (!out) out = this._vanilla.get(key);

    return out;
  }

  has(key: string | Identifiable): boolean {
    if (typeof key !== "string") key = key.id;

    if (this._data.has(key)) return true;

    return this._vanilla.has(key);
  }

  set(value: T): this {
    this._data.set(value.id, value);

    return this;
  }

  static createID<T extends Identifiable, U extends Identifiable>(vanilla: U[], edu: U[], Container: Container): DataSet<T, U> {
    const conn = VanillaConnector.createID<U>(vanilla, edu, Container);

    return new DataSet<T, U>(conn);
  }

  static createString<T extends Identifiable>(vanilla: string[], edu: string[], Container: Container): DataSet<T, string> {
    const conn = VanillaConnector.createString(vanilla, edu, Container);

    return new DataSet<T, string>(conn);
  }
}
