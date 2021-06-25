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

    const content = typeof doc === "object" ? doc.getText() : doc;
    if (content !== "") out = jsonc.parse(content);

    return out;
  }
}
