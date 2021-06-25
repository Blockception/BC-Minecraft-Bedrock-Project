import { MCProject } from "bc-minecraft-project";
import { DataSetConnector } from "../../Types/DataSet/DataSetConnector";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { BehaviorPack } from "./BehaviorPack";

import * as AnimationController from "./Types/AnimationController/include";
import * as Animation from "./Types/Animation/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Function from "./Types/Function/include";
import * as Item from "./Types/Item/include";
import * as LootTable from "./Types/LootTable/include";
import * as Structure from "./Types/Structure/include";
import * as Trading from "./Types/Trading/include";
import { Types } from "bc-minecraft-bedrock-vanilla-data";

/** */
export class BehaviorPackCollection {
  /** */
  public packs: BehaviorPack[];

  /**The collection of animations*/
  readonly animations: DataSetConnector<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetConnector<AnimationController.AnimationController>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block | Types.BehaviorPack.Block>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity | Types.BehaviorPack.Entity>;
  /**The collection of mcfunctions*/
  readonly functions: DataSetConnector<Function.Function>;
  /**The collection of items*/
  readonly items: DataSetConnector<Item.Item | Types.BehaviorPack.Item>;
  /**The collection of loot tables*/
  readonly loot_tables: DataSetConnector<LootTable.LootTable | Types.BehaviorPack.LootTable>;
  /**The collection of structures*/
  readonly structures: DataSetConnector<Structure.Structure>;
  /**The collection of trading tables*/
  readonly trading: DataSetConnector<Trading.Trading | Types.BehaviorPack.Trading>;

  constructor() {
    this.packs = [];

    //Connections
    this.animations = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].animations.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.animation_controllers = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].animation_controllers.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.blocks = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].blocks.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.entities = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].entities.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.functions = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].functions.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.items = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].items.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.loot_tables = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].loot_tables.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.structures = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].structures.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.trading = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].trading.get(id);
        if (p) return p;
      }

      return undefined;
    });
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): void {
    const uri = doc.uri;

    for (var I = 0; I < this.packs.length; I++) {
      const current = this.packs[I];
      if (uri.startsWith(current.folder)) {
        current.process(doc);
        return;
      }
    }
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
