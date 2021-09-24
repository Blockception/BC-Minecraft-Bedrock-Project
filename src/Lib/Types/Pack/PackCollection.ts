import { Types } from 'bc-minecraft-bedrock-types';
import { DataSetBase } from "../DataSet/include";
import { TextDocument } from "../TextDocument/TextDocument";
import { Pack } from "./Pack";

/**The class PackCollection description*/
export class PackCollection<T extends Pack> {
  /** */
  public packs: T[];

  /**Creates a new instances of the class*/
  constructor() {
    this.packs = [];
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetBase | undefined {
    const pack = this.get(doc);

    if (pack) {
      return pack.process(doc);
    }

    return undefined;
  }

  /** */
  count(): number {
    return this.packs.length;
  }

  /**
   *
   * @param doc
   * @returns
   */
  get(doc: TextDocument | string): T | undefined {
    const uri = typeof doc === "string" ? doc : doc.uri;

    for (let I = 0; I < this.packs.length; I++) {
      const current = this.packs[I];
      if (uri.startsWith(current.folder)) {
        return current;
      }
    }

    return undefined;
  }

  /**
   *
   * @param folder
   * @returns
   */
  delete(folder: string): boolean {
    const old = this.packs.length;

    this.packs = this.packs.filter((value) => value.folder !== folder);

    return old !== this.packs.length;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    const p = this.get(uri);

    if (p) return p.deleteFile(uri);

    return false;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    //If the folder that has been deleted is a pack, then the pack will have been removed
    out ||= this.delete(uri);

    //Checks if the folder is inside the pack
    const p = this.get(uri);
    if (p) out ||= p.deleteFolder(uri);

    return out;
  }

  /**
   * 
   * @param predicate 
   * @returns 
   */
  find(predicate: (value: Types.Identifiable & Types.Documentated & Types.Locatable, key: string) => boolean): (Types.Identifiable & Types.Documentated & Types.Locatable) | undefined {
    let value = undefined;

    for (let I = 0; I < this.packs.length; I++) {
      if (value = this.packs[I].find(predicate)) return value;
    }

    return value;
  }
}
