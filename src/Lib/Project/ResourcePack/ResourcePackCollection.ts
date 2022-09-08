import { DataSetConnector, PackCollection } from "../../Types";
import { MCProject } from "bc-minecraft-project";
import { ResourcePack } from "./ResourcePack";

import * as Animation from "./Animation";
import * as AnimationController from "./AnimationController";
import * as Attachable from "./Attachable";
import * as Block from "./Block";
import * as Entity from "./Entity";
import * as Fog from "./Fog";
import * as Particle from "./Particle";
import * as Material from "./Material";
import * as Model from "./Model";
import * as RenderController from "./RenderController";
import * as Sound from "./Sound";
import * as Texture from "./Texture";

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
