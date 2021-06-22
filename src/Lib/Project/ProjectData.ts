import { TextDocument } from "../Types/TextDocument";
import { BehaviorPackCollection } from "./BehaviorPack/BehaviorPackCollection";
import { ResourcePackCollection } from "./ResourcePack/ResourcePackCollection";

export class ProjectData {
  BehaviorPacks: BehaviorPackCollection;
  ResourcePacks: ResourcePackCollection;

  constructor() {
    this.BehaviorPacks = new BehaviorPackCollection();
    this.ResourcePacks = new ResourcePackCollection();
  }

  process(doc: TextDocument): void {}
}
