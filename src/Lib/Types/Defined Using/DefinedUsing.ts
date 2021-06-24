import { Defined } from "./Defined";
import { Using } from "./Using";

/** */
export interface DefinedUsing<T> extends Defined<T>, Using<T> {}

/** */
export namespace DefinedUsing {
  /**
   *
   * @param using
   * @param defined
   * @returns
   */
  export function create<T>(using: T[] | undefined = undefined, defined: T[] | undefined = undefined): DefinedUsing<T> {
    if (!using) using = [];
    if (!defined) defined = [];

    return {
      defined: defined,
      using: using,
    };
  }

  /**
   *
   * @returns
   */
  export function empty<T>(): DefinedUsing<T> {
    return { defined: [], using: [] };
  }
}
