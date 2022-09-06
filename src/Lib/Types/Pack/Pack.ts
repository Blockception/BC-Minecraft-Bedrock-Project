import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { PackType } from "../../Project";
import { DataSetBase } from "../DataSet";
import { TextDocument } from "../TextDocument/TextDocument";

/** */
export interface Pack {
  /** */
  readonly type: PackType;
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetBase | undefined;

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

  /**
   *
   * @param predicate
   * @returns
   */
  find(
    predicate: (value: Types.BaseObject, key: string) => boolean
  ): Types.BaseObject | undefined;

  /**
   *
   * @param callbackfn
   * @returns
   */
  forEach(callbackfn: (value: Types.BaseObject) => boolean): void;
}

/** */
export namespace Pack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Pack {
    if (
      typeof value === "object" &&
      typeof value.folder === "string" &&
      typeof value.process === "function"
    ) {
      return true;
    }

    return false;
  }
}
