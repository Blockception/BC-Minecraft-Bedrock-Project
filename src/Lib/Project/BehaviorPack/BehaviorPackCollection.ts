import { MCProject } from "bc-minecraft-project";
import { BehaviorPack } from "./BehaviorPack";
import { DataSetConnector, PackCollection } from "../../Types";

import * as AnimationController from "./AnimationController";
import * as Animation from "./Animation";
import * as Block from "./Block";
import * as Entity from "./Entity";
import * as Function from "./McFunction";
import * as Item from "./Item";
import * as LootTable from "./LootTable";
import * as Structure from "./Structure";
import * as Trading from "./Trading";
import { Manifest } from "../../Internal/Types";

/** */
export class BehaviorPackCollection extends PackCollection<BehaviorPack> {
  /**The collection of animations*/
  readonly animations: DataSetConnector<Animation.Animation, BehaviorPack>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetConnector<AnimationController.AnimationController, BehaviorPack>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block, BehaviorPack>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity, BehaviorPack>;
  /**The collection of mcfunctions*/
  readonly functions: DataSetConnector<Function.Function, BehaviorPack>;
  /**The collection of items*/
  readonly items: DataSetConnector<Item.Item, BehaviorPack>;
  /**The collection of loot tables*/
  readonly loot_tables: DataSetConnector<LootTable.LootTable, BehaviorPack>;
  /**The collection of structures*/
  readonly structures: DataSetConnector<Structure.Structure, BehaviorPack>;
  /**The collection of trading tables*/
  readonly trading: DataSetConnector<Trading.Trading, BehaviorPack>;

  constructor() {
    super();

    //Connections
    this.animations = new DataSetConnector(this, (pack) => pack.animations);
    this.animation_controllers = new DataSetConnector(this, (pack) => pack.animation_controllers);
    this.blocks = new DataSetConnector(this, (pack) => pack.blocks);
    this.entities = new DataSetConnector(this, (pack) => pack.entities);
    this.functions = new DataSetConnector(this, (pack) => pack.functions);
    this.items = new DataSetConnector(this, (pack) => pack.items);
    this.loot_tables = new DataSetConnector(this, (pack) => pack.loot_tables);
    this.structures = new DataSetConnector(this, (pack) => pack.structures);
    this.trading = new DataSetConnector(this, (pack) => pack.trading);
  }

  /**
   *
   * @param folder
   * @param context
   * @param manifest
   * @returns
   */
  add(folder: string, context: MCProject | string, manifest: Manifest): BehaviorPack {
    const out = new BehaviorPack(folder, context, manifest);
    this.packs.push(out);

    return out;
  }
}
