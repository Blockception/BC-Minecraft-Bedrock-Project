import { Types } from 'bc-minecraft-bedrock-types';
import { MCProject } from "bc-minecraft-project";
import { DataSetBase } from "../DataSet/include";
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
   find(predicate: (value: Types.Identifiable & Types.Documentated & Types.Locatable, key : string) => boolean) : (Types.Identifiable & Types.Documentated & Types.Locatable) | undefined;
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
