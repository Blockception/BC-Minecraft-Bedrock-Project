import { MCProject } from "bc-minecraft-project";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { Container } from "../../Types/Container/include";
import { DataSet, DataSetSingle } from "../../Types/DataSet/include";

import * as AnimationController from "./Types/AnimationController/include";
import * as Animation from "./Types/Animation/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Function from "./Types/Function/include";
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
  readonly animations: DataSetSingle<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetSingle<AnimationController.AnimationController>;
  /**The collection of blocks*/
  readonly blocks: DataSet<Block.Block, Types.BehaviorPack.Block>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity, Types.BehaviorPack.Entity>;
  /**The collection of mcfunctions*/
  readonly functions: DataSetSingle<Function.Function>;
  /**The collection of items*/
  readonly items: DataSet<Item.Item, Types.BehaviorPack.Item>;
  /**The collection of loot tables*/
  readonly loot_tables: DataSet<LootTable.LootTable, Types.BehaviorPack.LootTable>;
  /**The collection of structures*/
  readonly structures: DataSetSingle<Structure.Structure>;
  /**The collection of trading tables*/
  readonly trading: DataSet<Trading.Trading, Types.BehaviorPack.Trading>;

  /**
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = DataSet.create<AnimationController.AnimationController>();
    this.animations = DataSet.create<Animation.Animation>();

    this.blocks = DataSet.createID(Vanilla.BehaviorPack.Blocks, Edu.BehaviorPack.Blocks, this);
    this.entities = DataSet.createID(Vanilla.BehaviorPack.Entities, Edu.BehaviorPack.Entities, this);

    this.functions = DataSet.create<Function.Function>();

    this.items = DataSet.createID(Vanilla.BehaviorPack.Items, Edu.BehaviorPack.Items, this);
    this.loot_tables = DataSet.createString(Vanilla.BehaviorPack.LootTables, Edu.BehaviorPack.LootTables, this);

    this.structures = DataSet.create<Structure.Structure>();
    this.trading = DataSet.createString(Vanilla.BehaviorPack.Trading, Edu.BehaviorPack.Trading, this);
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument) {
    const Type = FileType.detect(doc.uri);

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
