/**
 *
 */
export interface FormatVersion {
  /**
   *
   */
  format_version: string;
}

/**
 *
 */
export namespace FormatVersion {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is FormatVersion {
    if (value && typeof value.format_version === "string") return true;

    return false;
  }
}
