import { MCProject } from "bc-minecraft-project";
import { DataSetConnector } from "../../Types/DataSet/DataSetConnector";
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
import { PackCollection } from "../../Types/Pack/PackCollection";

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
   * @param Context
   * @returns
   */
  add(folder: string, Context: MCProject | string): BehaviorPack {
    const out = new BehaviorPack(folder, Context);
    this.packs.push(out);

    return out;
  }
}
