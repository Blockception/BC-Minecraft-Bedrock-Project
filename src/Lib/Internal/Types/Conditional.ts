export type Conditional = string | ConditionalObject;

export namespace Conditional {
  export function getCondition(data: Conditional): string {
    if (typeof data === "string") return "";

    return data[0] ?? "";
  }

  export function getDefinition(data: Conditional): string {
    if (typeof data === "string") return data;

    const keys = Object.getOwnPropertyNames(data);

    return keys[0] ?? "";
  }
}

export interface ConditionalObject {
  [definition: string]: string;
}
