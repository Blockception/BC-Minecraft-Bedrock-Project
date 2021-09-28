import { MCProject } from "bc-minecraft-project";
import { Container } from "../../Types/Container/Container";
import { DataSetBase } from "../../Types/DataSet/include";

import { Pack } from "../../Types/Pack/Pack";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { Types } from 'bc-minecraft-bedrock-types';

/** */
export class WorldPack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetBase | undefined {
    this.deleteFile(doc.uri);

    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(uri: string): DataSetBase | undefined {
    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    return false;
  }

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean {
    return false;
  }

  /**
   * 
   * @param predicate 
   * @returns 
   */
  find(predicate: (value: Types.Identifiable & Types.Documentated & Types.Locatable, key: string) => boolean): (Types.Identifiable & Types.Documentated & Types.Locatable) | undefined {
    let value = undefined;

    return value;
  }
}

/**
 * 
 */
export namespace WorldPack {
  /**
   * 
   * @param value 
   * @returns 
   */
  export function is(value: any): value is WorldPack {
    if (typeof value === "object") {
      const temp = <WorldPack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.context !== "object") return false;
      if (typeof temp.folder !== "string") return false;

      return true;
    }

    return false;
  }
}