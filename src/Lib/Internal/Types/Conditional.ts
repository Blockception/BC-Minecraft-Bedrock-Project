export type Conditional = string | ConditionalObject;

/** */
export namespace Conditional {
  /**
   *
   * @param data
   * @returns
   */
  export function getCondition(data: Conditional): string {
    if (typeof data === "string") return "";

    return data[0] ?? "";
  }

  /**
   *
   * @param data
   * @returns
   */
  export function getDefinition(data: Conditional): string {
    if (typeof data === "string") return data;

    const keys = Object.getOwnPropertyNames(data);

    return keys[0] ?? "";
  }

  /**
   *
   * @param container
   * @param callbackfn
   */
  export function forEach(container: Conditional[], callbackfn: (value: string, key: string, container: Conditional[]) => void): void {
    container.forEach((c) => callbackfn(getCondition(c), getDefinition(c), container));
  }
}

/** */
export interface ConditionalObject {
  /** */
  [definition: string]: string;
}
