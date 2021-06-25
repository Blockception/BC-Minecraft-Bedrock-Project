import { MCProject } from "bc-minecraft-project";
import { DataSet, DataSetSingle } from "../../Types/DataSet/include";
import { Pack } from "../../Types/Pack/Pack";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";

import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { FileType } from "./Enum/include";
import { Container } from "../../Types/Container/include";

import * as Animation from "./Types/Animation/include";
import * as AnimationController from "./Types/AnimationController/include";
import * as Attachable from "./Types/Attachable/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Fog from "./Types/Fog/include";
import * as Item from "./Types/Item/Item";
import * as Material from "./Types/Material/include";
import * as Model from "./Types/Model/include";
import * as Sound from "./Types/Sound/include";
import * as Texture from "./Types/Texture/include";

export class ResourcePack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**The collection of  animations*/
  readonly animations: DataSet<Animation.Animation, Types.ResourcePack.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController.AnimationController, Types.ResourcePack.AnimationController>;
  /**The collection of animations controllers*/
  readonly attachables: DataSetSingle<Attachable.Attachable>;
  /**The collection of blocks*/
  readonly blocks: DataSetSingle<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity, Types.ResourcePack.Entity>;
  /**The collection of items*/
  readonly items: DataSetSingle<Item.Item>;
  /**The collection of fogs*/
  readonly fogs: DataSet<Fog.Fog, Types.ResourcePack.Fog>;
  /**The collection of materials*/
  readonly materials: DataSet<Material.Material, Types.ResourcePack.Material>;
  /**The collection of models*/
  readonly models: DataSet<Model.Model, Types.ResourcePack.Model>;
  /**The collection of sounds*/
  readonly sounds: DataSet<Sound.Sound, Types.ResourcePack.Sound>;
  /**The collection of textures*/
  readonly textures: DataSet<Texture.Texture, Types.ResourcePack.Texture>;

  /**
   *
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from
   */
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = DataSet.createString(Vanilla.ResourcePack.AnimationControllers, Edu.ResourcePack.AnimationControllers, this);
    this.animations = DataSet.createString(Vanilla.ResourcePack.Animations, Edu.ResourcePack.Animations, this);
    this.attachables = DataSet.create();
    this.blocks = DataSet.create();
    this.entities = DataSet.createID(Vanilla.ResourcePack.Entities, Edu.ResourcePack.Entities, this);
    this.items = DataSet.create();
    this.fogs = DataSet.createString(Vanilla.ResourcePack.Fogs, Edu.ResourcePack.Fogs, this);
    this.materials = DataSet.createString(Vanilla.ResourcePack.Materials, Edu.ResourcePack.Materials, this);
    this.models = DataSet.createString(Vanilla.ResourcePack.Models, Edu.ResourcePack.Models, this);
    this.sounds = DataSet.createString(Vanilla.ResourcePack.Sounds, Edu.ResourcePack.Sounds, this);
    this.textures = DataSet.createString(Vanilla.ResourcePack.Textures, Edu.ResourcePack.Textures, this);
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

      case FileType.attachable:
        return this.attachables.set(Attachable.Process(doc));
    }
  }
}
