import { MCProject } from "bc-minecraft-project";
import path = require("path");
import { Manifest } from "../Internal/Types/Manifest";
import { TextDocument } from "../Types/TextDocument/TextDocument";
import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { BehaviorPackCollection } from "./BehaviorPack/BehaviorPackCollection";
import { PackType } from "./Enum/PackType";
import { GeneralCollection } from "./General/General";
import { ResourcePack } from "./ResourcePack/ResourcePack";
import { ResourcePackCollection } from "./ResourcePack/ResourcePackCollection";
import { ProjectContext } from "../Types/ProjectContext/ProjectContext";
import { DataSetBase } from "../Types/DataSet/include";
import { Pack } from "../Types/Pack/Pack";
import { Types } from 'bc-minecraft-bedrock-types';

/**The project cache for minecraft*/
export class ProjectData {
  /**The collection of behavior packs*/
  BehaviorPacks: BehaviorPackCollection;
  /**The collection of resource packs*/
  ResourcePacks: ResourcePackCollection;
  /**The collection of general items*/
  General: GeneralCollection;
  /**The context needed to run this project data collection*/
  Context: ProjectContext;

  constructor(Context: ProjectContext) {
    this.BehaviorPacks = new BehaviorPackCollection();
    this.ResourcePacks = new ResourcePackCollection();
    this.General = new GeneralCollection();
    this.Context = Context;
  }

  /**Processes the given textdocument into the bacp
   * @param doc The document to process
   * @returns Returns the possible data the document was added to*/
  process(doc: TextDocument): DataSetBase | undefined {
    const type = PackType.detect(doc.uri);

    switch (type) {
      case PackType.behavior_pack:
        return this.BehaviorPacks.process(doc);

      case PackType.resource_pack:
        return this.ResourcePacks.process(doc);
    }

    return undefined;
  }

  /**Returns the specific pack that belongs the document, returns undefined if nothing is found
   * @param doc The document to process*/
  get(doc: TextDocument | string): BehaviorPack | ResourcePack | undefined {
    const out = this.BehaviorPacks.get(doc);

    if (out) return out;

    return this.ResourcePacks.get(doc);
  }

  /** */
  find(predicate: (value: Types.Identifiable & Types.Documentated & Types.Locatable) => boolean) : (Types.Identifiable & Types.Documentated & Types.Locatable) | undefined {
    let value = undefined;

    if (value = this.BehaviorPacks.find(predicate)) return value;
    if (value = this.ResourcePacks.find(predicate)) return value;    

    return undefined;
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

  /**
   *
   * @param manifesturi
   * @param Context
   */
  addPack(manifesturi: string | string[], Context: string | MCProject): Pack[] {
    return ProjectData.Add(manifesturi, this, Context);
  }

  /**
   *
   * @param uri
   */
  deleteFile(uri: string): boolean {
    let out = false;

    out ||= this.BehaviorPacks.deleteFile(uri);
    out ||= this.General.deleteFile(uri);
    out ||= this.ResourcePacks.deleteFile(uri);

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out ||= this.BehaviorPacks.deleteFolder(uri);
    out ||= this.General.deleteFolder(uri);
    out ||= this.ResourcePacks.deleteFolder(uri);

    return out;
  }
}

/**
 *
 */
export namespace ProjectData {
  /**
   *
   * @param manifestPath
   * @param projectData
   * @param Context
   * @returns
   */
  export function Add(manifestPath: string | string[], projectData: ProjectData, Context: string | MCProject): Pack[] {
    if (!Array.isArray(manifestPath)) {
      manifestPath = [manifestPath];
    }

    const out: Pack[] = [];

    for (var I = 0; I < manifestPath.length; I++) {
      const Pack = Process(manifestPath[I], projectData, Context);

      if (Pack) out.push(Pack);
    }

    return out;
  }
}

/**
 *
 * @param files
 * @param PF
 */
function Process(manifestUri: string, projectData: ProjectData, Context: string | MCProject): Pack | undefined {
  const Type = PackType.detect(manifestUri);
  const parent = manifestUri.replace(/[\\\/]manifest.json/gi, "");

  switch (Type) {
    case PackType.behavior_pack:
      return projectData.BehaviorPacks.add(parent, Context);

    case PackType.resource_pack:
      return projectData.ResourcePacks.add(parent, Context);

    case PackType.skin_pack:
    case PackType.world:
      break;

    case PackType.unknown:
    default:
      const manifest = Manifest.GetManifest(manifestUri, projectData.Context);
      if (!manifest) break;

      const SubType = Manifest.DetectType(manifest);

      switch (SubType) {
        case PackType.behavior_pack:
          return projectData.BehaviorPacks.add(parent, Context);

        case PackType.resource_pack:
          return projectData.ResourcePacks.add(parent, Context);

        case PackType.skin_pack:
        case PackType.world:
        case PackType.unknown:
        case PackType.world:
          break;
      }
  }

  return undefined;
}
