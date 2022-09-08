import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../Internal/Types/Manifest";
import { TextDocument } from "../Types/TextDocument/TextDocument";
import { BehaviorPack } from "./BehaviorPack/BehaviorPack";
import { BehaviorPackCollection } from "./BehaviorPack/BehaviorPackCollection";
import { PackType } from "./Enum/PackType";
import { GeneralCollection } from "./General/General";
import { ResourcePack } from "./ResourcePack/ResourcePack";
import { ResourcePackCollection } from "./ResourcePack/ResourcePackCollection";
import { ProjectContext } from "../Types/ProjectContext/ProjectContext";
import { DataSetBase } from "../Types/DataSet";
import { Pack } from "../Types/Pack/Pack";
import { Types } from "bc-minecraft-bedrock-types";
import {
  ProcessAnimationCommands,
  ProcessAnimationControllerCommands,
  ProcessMcFunction,
} from "./General/Types/Commands/Process";
import { WorldPackCollection } from "./World";
import { WorldPack } from "./World/WorldPack";
import { FileType } from './BehaviorPack/Enum';

/**The project cache for minecraft*/
export class ProjectData {
  /**The collection of behavior packs*/
  BehaviorPacks: BehaviorPackCollection;
  /**The collection of resource packs*/
  ResourcePacks: ResourcePackCollection;
  /**The collection of worlds*/
  Worlds: WorldPackCollection;
  /**The collection of general items*/
  General: GeneralCollection;
  /**The context needed to run this project data collection*/
  Context: ProjectContext;

  constructor(Context: ProjectContext) {
    this.BehaviorPacks = new BehaviorPackCollection();
    this.ResourcePacks = new ResourcePackCollection();
    this.General = new GeneralCollection();
    this.Worlds = new WorldPackCollection();
    this.Context = Context;
  }

  /**Processes the given textdocument into the bacp
   * @param doc The document to process
   * @returns Returns the possible data the document was added to*/
  process(doc: TextDocument): DataSetBase | undefined {
    const type = PackType.detect(doc.uri);

    switch (type) {
      case PackType.behavior_pack:
        const out = this.BehaviorPacks.process(doc);

        //Commands
        switch (FileType.detect(doc.uri)) {
          case FileType.function:
            ProcessMcFunction(doc, this.General);
            break;

          case FileType.animation:
            ProcessAnimationCommands(doc, this.General);
            break;

          case FileType.animation_controller:
            ProcessAnimationControllerCommands(doc, this.General);
            break;
        }

        return out;

      case PackType.resource_pack:
        return this.ResourcePacks.process(doc);

      case PackType.world:
        return this.Worlds.process(doc);
    }

    return undefined;
  }

  /**Returns the specific pack that belongs the document, returns undefined if nothing is found
   * @param doc The document to process*/
  get(
    doc: TextDocument | string
  ): BehaviorPack | ResourcePack | WorldPack | undefined {
    let out: BehaviorPack | ResourcePack | WorldPack | undefined;
    if ((out = this.BehaviorPacks.get(doc))) return out;
    if ((out = this.ResourcePacks.get(doc))) return out;
    if ((out = this.Worlds.get(doc))) return out;

    return undefined;
  }

  /** */
  find(
    predicate: (value: Types.BaseObject) => boolean
  ): Types.BaseObject | undefined {
    let value = undefined;

    if ((value = this.BehaviorPacks.find(predicate))) return value;
    if ((value = this.ResourcePacks.find(predicate))) return value;
    if ((value = this.General.find(predicate))) return value;
    if ((value = this.Worlds.find(predicate))) return value;

    return undefined;
  }

  /**Checks if the given collection has a given entity
   * @param id The idenfitication of the entity
   * @returns true when it exists, false when it does not*/
  hasEntity(id: string): boolean {
    if (
      this.BehaviorPacks.entities.has(id) ||
      this.ResourcePacks.entities.has(id)
    )
      return true;

    return false;
  }

  /**Checks if the given collection has a given block
   * @param id The idenfitication of the block
   * @returns true when it exists, false when it does not*/
  hasBlock(id: string): boolean {
    if (this.BehaviorPacks.blocks.has(id) || this.ResourcePacks.blocks.has(id))
      return true;

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

    out = this.BehaviorPacks.deleteFile(uri) || out;
    out = this.General.deleteFile(uri) || out;
    out = this.ResourcePacks.deleteFile(uri) || out;

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out = this.BehaviorPacks.deleteFolder(uri) || out;
    out = this.General.deleteFolder(uri) || out;
    out = this.ResourcePacks.deleteFolder(uri) || out;

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
  export function Add(
    manifestPath: string | string[],
    projectData: ProjectData,
    Context: string | MCProject
  ): Pack[] {
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
 * @param manifestUri
 * @param projectData
 * @param Context
 * @returns
 */
function Process(
  manifestUri: string,
  projectData: ProjectData,
  Context: string | MCProject
): Pack | undefined {
  const Type = Manifest.DetectTypeUri(
    manifestUri,
    projectData.Context.getDocument
  );
  const parent = manifestUri.replace(/[\\\/]manifest.json/gi, "");

  switch (Type) {
    case PackType.behavior_pack:
      return projectData.BehaviorPacks.add(parent, Context);

    case PackType.resource_pack:
      return projectData.ResourcePacks.add(parent, Context);

    case PackType.skin_pack:
      break;

    case PackType.world:
      return projectData.Worlds.add(parent, Context);

    case PackType.unknown:
    default:
      return undefined;
  }

  return undefined;
}
