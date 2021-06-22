import { MCProject } from "bc-minecraft-project";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { Entity } from "./Types/Entity/Entity";
import { Block } from "./Types/Block/Block";
import { Item } from "./Types/Entity/Item/Item";
import { Trading } from "./Types/Entity/Trading/LootTable";
import { LootTable } from "./Types/Entity/LootTable/LootTable";
import { Container } from "../../Types/Container";
import { DataSet } from "../../Types/DataSet";

/**
 *
 */
export class BehaviorPack implements Container {
  readonly folder: string;
  readonly context: MCProject;

  readonly blocks: DataSet<Block, Types.BehaviorPack.Block>;
  readonly entities: DataSet<Entity, Types.BehaviorPack.Entity>;
  readonly items: DataSet<Item, Types.BehaviorPack.Item>;
  readonly loot_tables: DataSet<LootTable, string>;
  readonly structures: DataSet<Structure, string>;
  readonly trading: DataSet<Trading, string>;

  /**
   *
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from
   */
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.blocks = DataSet.createID(Vanilla.BehaviorPack.Blocks, Edu.BehaviorPack.Blocks, this);
    this.entities = DataSet.createID(Vanilla.BehaviorPack.Entities, Edu.BehaviorPack.Entities, this);
    this.items = DataSet.createID(Vanilla.BehaviorPack.Items, Edu.BehaviorPack.Items, this);
    this.loot_tables = DataSet.createString(Vanilla.BehaviorPack.LootTables, Edu.BehaviorPack.LootTables, this);
    this.trading = DataSet.createString(Vanilla.BehaviorPack.Trading, Edu.BehaviorPack.Trading, this);
  }
}
