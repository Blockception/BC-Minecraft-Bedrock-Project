/** */
export interface Position {
  /** */
  line: number;
  /** */
  character: number;
}

/** */
export namespace Position {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Position {
    if (value && typeof value.line === "number" && value.character === "number") return true;

    return false;
  }

  /**
   *
   * @param line
   * @param character
   * @returns
   */
  export function create(line: number = 0, character: number = 0): Position {
    return { line: line, character: character };
  }
}
