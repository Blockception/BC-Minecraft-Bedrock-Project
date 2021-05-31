import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { ResourcePack } from "./ResourcePack/ResourcePack";

export class ProjectData {
  BehaviorPacks: BehaviorPack[];
  ResourcePacks: ResourcePack[];

  constructor() {
    this.BehaviorPacks = [];
    this.ResourcePacks = [];
  }
}
