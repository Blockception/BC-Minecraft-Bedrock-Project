import { MCProject } from "bc-minecraft-project";
import { TextDocument } from "../../Types/TextDocument";
import { BehaviorPack } from "./BehaviorPack";

/**
 *
 */
export class BehaviorPackCollection {
  /**
   *
   */
  public packs: BehaviorPack[];

  constructor() {
    this.packs = [];
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): void {
    const uri = doc.uri;

    for (var I = 0; I < this.packs.length; I++) {
      const current = this.packs[I];
      if (uri.startsWith(current.folder)) {
        current.process(doc);
        return;
      }
    }
  }

  /**
   *
   * @param doc
   * @returns
   */
  get(doc: TextDocument | string): BehaviorPack | undefined {
    const uri = typeof doc === "string" ? doc : doc.uri;

    for (var I = 0; I < this.packs.length; I++) {
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
   * @param folder
   * @param Context
   * @returns
   */
  add(folder: string, Context: MCProject | string): BehaviorPack {
    const out = new BehaviorPack(folder, Context);
    this.packs.push(out);

    return out;
  }
}
