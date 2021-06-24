/**
 *
 */
export interface Documentated {
  /**
   *
   */
  documentation?: string;
}

/**
 *
 */
export namespace Documentated {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Documentated {
    if (value && typeof value.documentation === "string") {
      return true;
    }

    return false;
  }
}
