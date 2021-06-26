import { TextDocument } from "../Types/TextDocument/TextDocument";
import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { BehaviorPackCollection } from "./BehaviorPack/BehaviorPackCollection";
import { PackType } from "./Enum/PackType";
import { ResourcePack } from "./ResourcePack/ResourcePack";
import { ResourcePackCollection } from "./ResourcePack/ResourcePackCollection";

/** */
export class ProjectData {
  /** */
  BehaviorPacks: BehaviorPackCollection;
  /** */
  ResourcePacks: ResourcePackCollection;

  constructor() {
    this.BehaviorPacks = new BehaviorPackCollection();
    this.ResourcePacks = new ResourcePackCollection();
  }

  /**
   *
   * @param doc
   * @returns
   */
  process(doc: TextDocument): void {
    const type = PackType.detect(doc.uri);

    switch (type) {
      case PackType.behavior_pack:
        return this.BehaviorPacks.process(doc);

      case PackType.resource_pack:
        return this.ResourcePacks.process(doc);
    }
  }

  /**
   *
   * @param doc
   */
  get(doc: TextDocument | string): BehaviorPack | ResourcePack | undefined {
    let out = this.BehaviorPacks.get(doc);

    if (out) return out;

    return this.ResourcePacks.get(doc);
  }
}
