import { MCProject } from "bc-minecraft-project";
import { DataSetConnector } from "../../Types/DataSet/DataSetConnector";
import { DataSet } from "../../Types/include";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { BehaviorPack } from "./BehaviorPack";

import * as AnimationController from "./Types/AnimationController/include";
import * as Animation from "./Types/Animation/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Function from "./Types/McFunction/include";
import * as Item from "./Types/Item/include";
import * as LootTable from "./Types/LootTable/include";
import * as Structure from "./Types/Structure/include";
import * as Trading from "./Types/Trading/include";

/** */
export class BehaviorPackCollection {
  /** */
  public packs: BehaviorPack[];

  /**The collection of animations*/
  readonly animations: DataSetConnector<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetConnector<AnimationController.AnimationController>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity>;
  /**The collection of mcfunctions*/
  readonly functions: DataSetConnector<Function.Function>;
  /**The collection of items*/
  readonly items: DataSetConnector<Item.Item>;
  /**The collection of loot tables*/
  readonly loot_tables: DataSetConnector<LootTable.LootTable>;
  /**The collection of structures*/
  readonly structures: DataSetConnector<Structure.Structure>;
  /**The collection of trading tables*/
  readonly trading: DataSetConnector<Trading.Trading>;

  constructor() {
    this.packs = [];

    const count = () => this.packs.length;

    //Connections
    this.animations = new DataSetConnector(count, (index) => this.packs[index].animations);
    this.animation_controllers = new DataSetConnector(count, (index) => this.packs[index].animation_controllers);
    this.blocks = new DataSetConnector(count, (index) => this.packs[index].blocks);
    this.entities = new DataSetConnector(count, (index) => this.packs[index].entities);
    this.functions = new DataSetConnector(count, (index) => this.packs[index].functions);
    this.items = new DataSetConnector(count, (index) => this.packs[index].items);
    this.loot_tables = new DataSetConnector(count, (index) => this.packs[index].loot_tables);
    this.structures = new DataSetConnector(count, (index) => this.packs[index].structures);
    this.trading = new DataSetConnector(count, (index) => this.packs[index].trading);
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): boolean {
    const uri = doc.uri;

    for (var I = 0; I < this.packs.length; I++) {
      const current = this.packs[I];
      if (uri.startsWith(current.folder)) {
        current.deleteFile(doc.uri);
        current.process(doc);
        return true;
      }
    }

    return false;
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
