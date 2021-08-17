import { MCProject } from "bc-minecraft-project";
import { Container } from "../../Types/Container/include";
import { DataSet, DataSetBase } from "../../Types/DataSet/include";

import * as AnimationController from "./Types/AnimationController/include";
import * as Animation from "./Types/Animation/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Function from "./Types/McFunction/include";
import * as Item from "./Types/Item/include";
import * as LootTable from "./Types/LootTable/include";
import * as Structure from "./Types/Structure/include";
import * as Trading from "./Types/Trading/include";

import { Pack } from "../../Types/Pack/Pack";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { FileType } from "./Enum/FileType";

/** */
export class BehaviorPack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**The collection of animations*/
  readonly animations: DataSet<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController.AnimationController>;
  /**The collection of blocks*/
  readonly blocks: DataSet<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity>;
  /**The collection of mcfunctions*/
  readonly functions: DataSet<Function.Function>;
  /**The collection of items*/
  readonly items: DataSet<Item.Item>;
  /**The collection of loot tables*/
  readonly loot_tables: DataSet<LootTable.LootTable>;
  /**The collection of structures*/
  readonly structures: DataSet<Structure.Structure>;
  /**The collection of trading tables*/
  readonly trading: DataSet<Trading.Trading>;

  /**
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = new DataSet();
    this.animations = new DataSet();

    this.blocks = new DataSet();
    this.entities = new DataSet();

    this.functions = new DataSet();

    this.items = new DataSet();
    this.loot_tables = new DataSet();

    this.structures = new DataSet();
    this.trading = new DataSet();
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): any {
    const Type = FileType.detect(doc.uri);

    //If extended, also extend the delete
    switch (Type) {
      case FileType.animation:
        return this.animations.set(Animation.Process(doc));

      case FileType.animation_controller:
        return this.animation_controllers.set(AnimationController.Process(doc));

      case FileType.block:
        return this.blocks.set(Block.Process(doc));

      case FileType.entity:
        return this.entities.set(Entity.Process(doc));

      case FileType.function:
        return this.functions.set(Function.Process(doc));

      case FileType.item:
        return this.items.set(Item.Process(doc));

      case FileType.loot_table:
        return this.loot_tables.set(LootTable.Process(doc));

      case FileType.structure:
        return this.structures.set(Structure.Process(doc));

      case FileType.trading:
        return this.trading.set(Trading.Process(doc));
    }
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(uri: string): DataSetBase | undefined {
    const Type = FileType.detect(uri);

    switch (Type) {
      case FileType.animation:
        return this.animations;

      case FileType.animation_controller:
        return this.animation_controllers;

      case FileType.block:
        return this.blocks;

      case FileType.entity:
        return this.entities;

      case FileType.function:
        return this.functions;

      case FileType.item:
        return this.items;

      case FileType.loot_table:
        return this.loot_tables;

      case FileType.structure:
        return this.structures;

      case FileType.trading:
        return this.trading;

      default:
        return undefined;
    }
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    let out = false;

    out ||= this.animations.deleteFile(uri);
    out ||= this.animation_controllers.deleteFile(uri);
    out ||= this.blocks.deleteFile(uri);
    out ||= this.entities.deleteFile(uri);
    out ||= this.functions.deleteFile(uri);
    out ||= this.items.deleteFile(uri);
    out ||= this.loot_tables.deleteFile(uri);
    out ||= this.structures.deleteFile(uri);
    out ||= this.trading.deleteFile(uri);

    return out;
  }

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out ||= this.animations.deleteFolder(uri);
    out ||= this.animation_controllers.deleteFolder(uri);
    out ||= this.blocks.deleteFolder(uri);
    out ||= this.entities.deleteFolder(uri);
    out ||= this.functions.deleteFolder(uri);
    out ||= this.items.deleteFolder(uri);
    out ||= this.loot_tables.deleteFolder(uri);
    out ||= this.structures.deleteFolder(uri);
    out ||= this.trading.deleteFolder(uri);

    return out;
  }
}

export namespace BehaviorPack {
  export function is(value: any): value is BehaviorPack {
    if (typeof value === "object") {
      //Order is determined buy likely / unlikely it is that it missing
      if (!value.functions) return false;
      if (!value.items) return false;
      if (!value.loot_tables) return false;
      if (!value.structures) return false;
      if (!value.trading) return false;

      if (!value.animations) return false;
      if (!value.animation_controllers) return false;
      if (!value.blocks) return false;
      if (!value.context) return false;
      if (!value.entities) return false;
      if (!value.folder) return false;
    }

    return false;
  }
}
