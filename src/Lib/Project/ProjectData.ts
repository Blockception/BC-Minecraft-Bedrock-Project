import { TextDocument } from "../Types/TextDocument/TextDocument";
import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { BehaviorPackCollection } from "./BehaviorPack/BehaviorPackCollection";
import { PackType } from "./Enum/PackType";
import { ResourcePack } from "./ResourcePack/ResourcePack";
import { ResourcePackCollection } from "./ResourcePack/ResourcePackCollection";

/**The project cache for minecraft*/
export class ProjectData {
  /**The collection of behavior packs*/
  BehaviorPacks: BehaviorPackCollection;
  /**The collection of resource packs*/
  ResourcePacks: ResourcePackCollection;

  constructor() {
    this.BehaviorPacks = new BehaviorPackCollection();
    this.ResourcePacks = new ResourcePackCollection();
  }

  /**Processes the given textdocument into the bacp
   * @param doc The document to process
   * @returns Returns true or false if it was succesfull processed*/
  process(doc: TextDocument): boolean {
    const type = PackType.detect(doc.uri);

    switch (type) {
      case PackType.behavior_pack:
        return this.BehaviorPacks.process(doc);

      case PackType.resource_pack:
        return this.ResourcePacks.process(doc);
    }

    return false;
  }

  /**Returns the specific pack that belongs the document, returns undefined if nothing is found
   * @param doc The document to process*/
  get(doc: TextDocument | string): BehaviorPack | ResourcePack | undefined {
    let out = this.BehaviorPacks.get(doc);

    if (out) return out;

    return this.ResourcePacks.get(doc);
  }

  /**Checks if the given collection has a given entity
   * @param id The idenfitication of the entity
   * @returns true when it exists, false when it does not*/
  hasEntity(id: string): boolean {
    if (this.BehaviorPacks.entities.has(id) || this.ResourcePacks.entities.has(id)) return true;

    return false;
  }

  /**Checks if the given collection has a given block
   * @param id The idenfitication of the block
   * @returns true when it exists, false when it does not*/
  hasBlock(id: string): boolean {
    if (this.BehaviorPacks.blocks.has(id) || this.ResourcePacks.blocks.has(id)) return true;

    return false;
  }

  /**Checks if the given collection has a given item
   * @param id The idenfitication of the item
   * @returns true when it exists, false when it does not*/
  hasItem(id: string): boolean {
    if (this.BehaviorPacks.items.has(id)) return true;

    return false;
  }
}
