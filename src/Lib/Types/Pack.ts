import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { PackType } from "../Project/PackType";
import { DataSetBase } from "./DataSet";
import { TextDocument } from "./TextDocument";
import { Manifest } from "../Internal/Types";

/** */
export interface Pack {
  /**The type of the pack */
  readonly type: PackType;
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;
  /**The manifest of the pack */
  readonly manifest: Manifest;

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
  find(predicate: (value: Types.BaseObject, key: string) => boolean): Types.BaseObject | undefined;

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
    if (typeof value === "object" && typeof value.folder === "string" && typeof value.process === "function") {
      return true;
    }

    return false;
  }
}
