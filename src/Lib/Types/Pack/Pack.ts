import { MCProject } from "bc-minecraft-project";
import { TextDocument } from "../TextDocument/TextDocument";

/** */
export interface Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): any;

  /**
   *
   * @param uri
   */
  deleteFile(uri: string): boolean;

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean;
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
