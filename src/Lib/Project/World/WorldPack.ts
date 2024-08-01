import { MCProject } from "bc-minecraft-project";
import { Container } from "../../Types/Container";
import { DataSetBase } from "../../Types/DataSet";

import { Pack } from "../../Types/Pack";
import { TextDocument } from "../../Types/TextDocument";
import { Types } from "bc-minecraft-bedrock-types";
import { PackType } from "../PackType";
import { Manifest } from "../../Internal/Types";

/** */
export class WorldPack implements Container, Pack {
  readonly type: PackType = PackType.world;
  readonly folder: string;
  readonly context: MCProject;
  readonly manifest: Manifest;

  /**
   * Creates a new instance of WorldPack
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, Context: MCProject | string, manifest: Manifest) {
    this.folder = folder;
    this.manifest = manifest;
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
  find(predicate: (value: Types.BaseObject, key: string) => boolean): Types.BaseObject | undefined {
    let value = undefined;

    return value;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  forEach(callbackfn: (value: Types.BaseObject) => void): void {}
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
