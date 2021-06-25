/** */
export interface FormatVersion {
  /** */
  format_version: string;
}

/** */
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

  /**
   *
   * @param value
   * @returns
   */
  export function get(value: FormatVersion | string): [major: number, minor: number, patch: number] {
    const out: [major: number, minor: number, patch: number] = [0, 0, 0];

    if (typeof value === "object") {
      value = value.format_version;
    }

    const s = value.split(".");
    const max = Math.min(s.length, 3);

    for (var I = 0; I < max; I++) {
      out[I] = Number.parseInt(s[I]);
    }

    return out;
  }
}
