import { jsonc } from "jsonc";
import { TextDocument } from "../Types/TextDocument/TextDocument";

/**The namespace that provided json code*/
export namespace Json {
  /**Takes the given text data and casts into the given object
   * @param doc The document or string to cast
   * @returns Return an object or undefined is something went wrong*/
  export function To<T>(doc: TextDocument | string): T | undefined {
    let out: T | undefined = undefined;

    try {
      const content = typeof doc === "object" ? doc.getText() : doc;

      if (content !== "") out = <T>jsonc.parse(content);
    } catch (err: any) {
      if (err.message && err.stack) {
        console.error(`${err.message}\n${err.stack}`);
      } else {
        console.error(JSON.stringify(err));
      }
    }

    return out;
  }
}
