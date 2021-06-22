import { MCProject } from "bc-minecraft-project";
import { Container, DataSet, DataSetSingle } from "../../Types/include";
import { Pack } from "../../Types/Pack";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { AnimationController } from "./Types/AnimationControllers/AnimationController";
import { Animation } from "./Types/Animation/Animation";
import { Block } from "./Types/Block/include";
import { Entity } from "./Types/Entity/include";

export class ResourcePack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**The collection of  animations*/
  readonly animations: DataSet<Animation, Types.ResourcePack.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController, Types.ResourcePack.AnimationController>;
  /**The collection of */
  readonly blocks: DataSetSingle<Block>;
  /**The collection of */
  readonly entities: DataSet<Entity, Types.ResourcePack.Entity>;
  /**The collection of */
  readonly items: DataSet<Item, Types.ResourcePack.Item>;

  /**
   *
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from
   */
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = DataSet.createID(Vanilla.ResourcePack.AnimationControllers, Edu.ResourcePack.AnimationControllers, this);
    this.animations = DataSet.createID(Vanilla.ResourcePack.Animations, Edu.ResourcePack.Animations, this);

    this.blocks = DataSet.create();
    this.entities = DataSet.createID(Vanilla.ResourcePack.Entities, Edu.ResourcePack.Entities, this);
  }
}
