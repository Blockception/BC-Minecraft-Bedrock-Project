import { MCProject } from "bc-minecraft-project";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { Entity } from "./Types/Entity/Entity";
import { Function } from "./Types/Function/Function";
import { Container } from "../../Types/Container";
import { DataSet, DataSetSingle } from "../../Types/DataSet";
import { Structure } from "./Types/Structure/include";
import { Item } from "./Types/Item/include";
import { LootTable } from "./Types/LootTable/include";
import { Trading } from "./Types/Trading/include";
import * as AnimationController from "./Types/AnimationController/include";
import * as Animation from "./Types/Animation/include";
import * as Block from "./Types/Block/include";
import { Pack } from "../../Types/Pack";
import { TextDocument } from "../../Types/TextDocument";
import { FileType } from "./Enum/FileType";

/**
 *
 */
export class BehaviorPack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**The collection of  animations*/
  readonly animations: DataSetSingle<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetSingle<AnimationController.AnimationController>;
  /**The collection of */
  readonly blocks: DataSet<Block.Block, Types.BehaviorPack.Block>;
  /**The collection of */
  readonly entities: DataSet<Entity, Types.BehaviorPack.Entity>;
  /**The collection of */
  readonly functions: DataSetSingle<Function>;
  /**The collection of */
  readonly items: DataSet<Item, Types.BehaviorPack.Item>;
  /**The collection of */
  readonly loot_tables: DataSet<LootTable, Types.BehaviorPack.LootTable>;
  /**The collection of */
  readonly structures: DataSetSingle<Structure>;
  /**The collection of */
  readonly trading: DataSet<Trading, Types.BehaviorPack.Trading>;

  /**
   *
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from
   */
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = DataSet.create<AnimationController.AnimationController>();
    this.animations = DataSet.create<Animation.Animation>();

    this.blocks = DataSet.createID(Vanilla.BehaviorPack.Blocks, Edu.BehaviorPack.Blocks, this);
    this.entities = DataSet.createID(Vanilla.BehaviorPack.Entities, Edu.BehaviorPack.Entities, this);

    this.functions = DataSet.create<Function>();

    this.items = DataSet.createID(Vanilla.BehaviorPack.Items, Edu.BehaviorPack.Items, this);
    this.loot_tables = DataSet.createString(Vanilla.BehaviorPack.LootTables, Edu.BehaviorPack.LootTables, this);

    this.structures = DataSet.create<Structure>();
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
    }
  }
}
