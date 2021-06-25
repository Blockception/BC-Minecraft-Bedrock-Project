import { TextDocument } from "../Types/TextDocument/TextDocument";
import { BehaviorPackCollection } from "./BehaviorPack/BehaviorPackCollection";
import { PackType } from "./Enum/PackType";
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
}
