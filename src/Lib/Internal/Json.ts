import { jsonc } from "jsonc";
import { TextDocument } from "../Types/TextDocument/TextDocument";

/**
 *
 */
export namespace Json {
  /**
   *
   * @param doc
   * @returns
   */
  export function To<T>(doc: TextDocument | string): T | undefined {
    let out: T | undefined = undefined;

    try {
      const content = typeof doc === "object" ? doc.getText() : doc;

      if (content !== "") out = <T>jsonc.parse(content);
    } catch (err) {
      console.error(JSON.stringify(err));
    }

    return out;
  }
}
