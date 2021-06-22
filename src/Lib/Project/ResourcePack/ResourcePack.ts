import { MCProject } from "bc-minecraft-project";
import { Container, DataSet, DataSetSingle } from "../../Types/include";
import { Pack } from "../../Types/Pack";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { AnimationController } from "./Types/AnimationControllers/AnimationController";
import { Animation } from "./Types/Animation/Animation";
import { Block } from "./Types/Block/include";
import { Entity } from "./Types/Entity/include";
import { Item } from "./Types/Item/Item";
import { Sound } from "./Types/Sound/include";
import { Texture } from "./Types/Texture/include";
import { Fog } from "./Types/Fog/include";
import { Material } from "./Types/Material/include";
import { Model } from "./Types/Model/include";
import { Attachable } from "./Types/Attachable/include";
import { TextDocument } from "../../Types/TextDocument";

export class ResourcePack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**The collection of  animations*/
  readonly animations: DataSet<Animation, Types.ResourcePack.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController, Types.ResourcePack.AnimationController>;
  /**The collection of animations controllers*/
  readonly attachables: DataSetSingle<Attachable>;
  /**The collection of */
  readonly blocks: DataSetSingle<Block>;
  /**The collection of */
  readonly entities: DataSet<Entity, Types.ResourcePack.Entity>;
  /**The collection of */
  readonly items: DataSetSingle<Item>;
  /**The collection of */
  readonly fogs: DataSet<Fog, Types.ResourcePack.Fog>;
  /**The collection of */
  readonly materials: DataSet<Material, Types.ResourcePack.Material>;
  /**The collection of */
  readonly models: DataSet<Model, Types.ResourcePack.Model>;
  /**The collection of */
  readonly sounds: DataSet<Sound, Types.ResourcePack.Sound>;
  /**The collection of */
  readonly textures: DataSet<Texture, Types.ResourcePack.Texture>;

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
    this.attachables = DataSet.create();
    this.blocks = DataSet.create();
    this.entities = DataSet.createID(Vanilla.ResourcePack.Entities, Edu.ResourcePack.Entities, this);
    this.items = DataSet.create();
    this.fogs = DataSet.createID(Vanilla.ResourcePack.Fogs, Edu.ResourcePack.Fogs, this);
    this.materials = DataSet.createID(Vanilla.ResourcePack.Materials, Edu.ResourcePack.Materials, this);
    this.models = DataSet.createID(Vanilla.ResourcePack.Models, Edu.ResourcePack.Models, this);
    this.sounds = DataSet.createID(Vanilla.ResourcePack.Sounds, Edu.ResourcePack.Sounds, this);
    this.textures = DataSet.createID(Vanilla.ResourcePack.Textures, Edu.ResourcePack.Textures, this);
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument) {
    //TODO
  }
}
