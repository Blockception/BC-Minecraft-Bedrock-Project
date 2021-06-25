import { TextDocument } from "../TextDocument/TextDocument";

/** */
export interface Pack {
  /**The folder path of the pack*/
  readonly folder: string;

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): void;
}

/** */
export namespace Pack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Pack {
    if (typeof value === "object" && typeof value.folder === "string" && typeof value.process === "function") {
      return true;
    }

    return false;
  }
}
