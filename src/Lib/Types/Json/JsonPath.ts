import { TextDocument } from "../TextDocument/include";

/**
 *
 */
export type JsonPath = string;

/**
 *
 */
export namespace JsonPath {
  /**
   *
   * @param text
   * @param path
   */
  export function resolve(text: string | TextDocument, path: JsonPath): number {
    if (typeof text === "object") text = text.getText();

    const s = path.split(/[\\/]/);
    let index = 0;

    for (var I = 0; I < s.length; I++) {
      const elem = s[I];

      if (!Number.isInteger(elem) && elem !== "") {
        const t = text.indexOf(elem, index);
        if (t > -1) index = t;
      }
    }

    return index;
  }
}
