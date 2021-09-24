import { MCProject } from "bc-minecraft-project";
import { ResourcePack } from "./ResourcePack";
import { DataSetConnector } from "../../Types/DataSet/DataSetConnector";

import * as Animation from "./Types/Animation/include";
import * as AnimationController from "./Types/AnimationController/include";
import * as Attachable from "./Types/Attachable/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Fog from "./Types/Fog/include";
import * as Particle from "./Types/Particle/include";
import * as Material from "./Types/Material/include";
import * as Model from "./Types/Model/include";
import * as RenderController from "./Types/RenderController/include";
import * as Sound from "./Types/Sound/include";
import * as Texture from "./Types/Texture/include";
import { PackCollection } from "../../Types/Pack/PackCollection";
import { Types } from 'bc-minecraft-bedrock-types';

/** */
export class ResourcePackCollection extends PackCollection<ResourcePack> {
  /**The collection of  animations*/
  readonly animations: DataSetConnector<Animation.Animation, ResourcePack>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetConnector<AnimationController.AnimationController, ResourcePack>;
  /**The collection of animations controllers*/
  readonly attachables: DataSetConnector<Attachable.Attachable, ResourcePack>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block, ResourcePack>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity, ResourcePack>;
  /**The collection of fogs*/
  readonly fogs: DataSetConnector<Fog.Fog, ResourcePack>;
  /**The collection of materials*/
  readonly materials: DataSetConnector<Material.Material, ResourcePack>;
  /**The collection of models*/
  readonly models: DataSetConnector<Model.Model, ResourcePack>;
  /**The collection of models*/
  readonly particles: DataSetConnector<Particle.Particle, ResourcePack>;
  /**The collection of sounds*/
  readonly render_controllers: DataSetConnector<RenderController.RenderController, ResourcePack>;
  /**The collection of sounds*/
  readonly sounds: DataSetConnector<Sound.Sound, ResourcePack>;
  /**The collection of textures*/
  readonly textures: DataSetConnector<Texture.Texture, ResourcePack>;

  /**Creates a new instances of the class*/
  constructor() {
    super();

    //Connections
    this.animations = new DataSetConnector(this, (pack) => pack.animations);
    this.animation_controllers = new DataSetConnector(this, (pack) => pack.animation_controllers);
    this.attachables = new DataSetConnector(this, (pack) => pack.attachables);
    this.blocks = new DataSetConnector(this, (pack) => pack.blocks);
    this.entities = new DataSetConnector(this, (pack) => pack.entities);
    this.fogs = new DataSetConnector(this, (pack) => pack.fogs);
    this.materials = new DataSetConnector(this, (pack) => pack.materials);
    this.models = new DataSetConnector(this, (pack) => pack.models);
    this.particles = new DataSetConnector(this, (pack) => pack.particles);
    this.render_controllers = new DataSetConnector(this, (pack) => pack.render_controllers);
    this.sounds = new DataSetConnector(this, (pack) => pack.sounds);
    this.textures = new DataSetConnector(this, (pack) => pack.textures);
  }

  /**
   *
   * @param folder
   * @param Context
   * @returns
   */
  add(folder: string, Context: MCProject | string): ResourcePack {
    const out = new ResourcePack(folder, Context);
    this.packs.push(out);

    return out;
  }
}
