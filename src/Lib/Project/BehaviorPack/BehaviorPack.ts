import { MCProject } from "bc-minecraft-project";
import { Container } from "../../Types/Container";
import { DataSet, DataSetBase } from "../../Types/DataSet";

import * as AnimationController from "./AnimationController";
import * as Animation from "./Animation";
import * as Block from "./Block";
import * as Entity from "./Entity";
import * as Feature from "./Feature";
import * as Function from "./McFunction";
import * as Item from "./Item";
import * as LootTable from "./LootTable";
import * as Structure from "./Structure";
import * as Trading from "./Trading";

import { Pack } from "../../Types/Pack";
import { TextDocument } from "../../Types/TextDocument";
import { FileType } from "./FileType";
import { PackType } from "../PackType";
import { Manifest } from "../../Internal/Types";

type CollectFieldsOfType<T> = {
  [K in keyof T]: T[K] extends DataSet<infer U> ? U : never;
};
type CollectionFieldsDataSet<T> = {
  [K in keyof T]: T[K] extends DataSet<infer U> ? DataSet<U> : never;
};

type ItemTypes = CollectFieldsOfType<BehaviorPack>[keyof BehaviorPack];
type DataSetTypes = CollectionFieldsDataSet<BehaviorPack>[keyof BehaviorPack];

/** */
export class BehaviorPack implements Container, Pack {
  readonly type: PackType = PackType.behavior_pack;
  readonly folder: string;
  readonly context: MCProject;
  readonly manifest: Manifest;

  /**The collection of animations*/
  readonly animations: DataSet<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController.AnimationController>;
  /**The collection of blocks*/
  readonly blocks: DataSet<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity>;
  /**The collection of features*/
  readonly features: DataSet<Feature.Feature>;
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
   * @param context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, context: MCProject | string, manifest: Manifest) {
    this.folder = folder;
    this.manifest = manifest;
    this.context = typeof context === "object" ? context : MCProject.loadSync(context);

    this.animations = new DataSet();
    this.animation_controllers = new DataSet();
    this.blocks = new DataSet();
    this.entities = new DataSet();
    this.functions = new DataSet();
    this.items = new DataSet();
    this.loot_tables = new DataSet();
    this.structures = new DataSet();
    this.trading = new DataSet();
    this.features = new DataSet();
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetTypes | undefined {
    this.deleteFile(doc.uri);
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

      case FileType.feature:
        return this.features.set(Feature.Process(doc));
    }

    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(uri: string): DataSetTypes | undefined {
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

    out = this.animations.deleteFile(uri) || out;
    out = this.animation_controllers.deleteFile(uri) || out;
    out = this.blocks.deleteFile(uri) || out;
    out = this.entities.deleteFile(uri) || out;
    out = this.functions.deleteFile(uri) || out;
    out = this.items.deleteFile(uri) || out;
    out = this.loot_tables.deleteFile(uri) || out;
    out = this.structures.deleteFile(uri) || out;
    out = this.trading.deleteFile(uri) || out;

    return out;
  }

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out = this.animations.deleteFolder(uri) || out;
    out = this.animation_controllers.deleteFolder(uri) || out;
    out = this.blocks.deleteFolder(uri) || out;
    out = this.entities.deleteFolder(uri) || out;
    out = this.functions.deleteFolder(uri) || out;
    out = this.items.deleteFolder(uri) || out;
    out = this.loot_tables.deleteFolder(uri) || out;
    out = this.structures.deleteFolder(uri) || out;
    out = this.trading.deleteFolder(uri) || out;

    return out;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: ItemTypes, key: string) => boolean): ItemTypes | undefined {
    let value = undefined;

    if ((value = this.animations.find(predicate))) return value;
    if ((value = this.animation_controllers.find(predicate))) return value;
    if ((value = this.blocks.find(predicate))) return value;
    if ((value = this.entities.find(predicate))) return value;
    if ((value = this.functions.find(predicate))) return value;
    if ((value = this.items.find(predicate))) return value;
    if ((value = this.loot_tables.find(predicate))) return value;
    if ((value = this.structures.find(predicate))) return value;
    if ((value = this.trading.find(predicate))) return value;

    return value;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  forEach(callbackfn: (value: ItemTypes) => void): void {
    this.animations.forEach(callbackfn);
    this.animation_controllers.forEach(callbackfn);
    this.blocks.forEach(callbackfn);
    this.entities.forEach(callbackfn);
    this.functions.forEach(callbackfn);
    this.items.forEach(callbackfn);
    this.loot_tables.forEach(callbackfn);
    this.structures.forEach(callbackfn);
    this.trading.forEach(callbackfn);
  }
}

/**
 *
 */
export namespace BehaviorPack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is BehaviorPack {
    if (typeof value === "object") {
      const temp = <BehaviorPack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.functions !== "object") return false;
      if (typeof temp.items !== "object") return false;
      if (typeof temp.loot_tables !== "object") return false;
      if (typeof temp.structures !== "object") return false;
      if (typeof temp.trading !== "object") return false;

      if (typeof temp.animations !== "object") return false;
      if (typeof temp.animation_controllers !== "object") return false;
      if (typeof temp.blocks !== "object") return false;
      if (typeof temp.entities !== "object") return false;

      if (typeof temp.context !== "object") return false;
      if (typeof temp.folder !== "string") return false;

      return true;
    }

    return false;
  }
}
