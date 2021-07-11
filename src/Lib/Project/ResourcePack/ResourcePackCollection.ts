import { MCProject } from "bc-minecraft-project";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
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
import * as Sound from "./Types/Sound/include";
import * as Texture from "./Types/Texture/include";

/** */
export class ResourcePackCollection {
  /** */
  public packs: ResourcePack[];

  /**The collection of  animations*/
  readonly animations: DataSetConnector<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetConnector<AnimationController.AnimationController>;
  /**The collection of animations controllers*/
  readonly attachables: DataSetConnector<Attachable.Attachable>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity>;
  /**The collection of fogs*/
  readonly fogs: DataSetConnector<Fog.Fog>;
  /**The collection of materials*/
  readonly materials: DataSetConnector<Material.Material>;
  /**The collection of models*/
  readonly models: DataSetConnector<Model.Model>;
  /**The collection of models*/
  readonly particles: DataSetConnector<Particle.Particle>;
  /**The collection of sounds*/
  readonly sounds: DataSetConnector<Sound.Sound>;
  /**The collection of textures*/
  readonly textures: DataSetConnector<Texture.Texture>;

  /**
   *
   */
  constructor() {
    this.packs = [];

    const count = () => this.packs.length;

    //Connections
    this.animations = new DataSetConnector(count, (index) => this.packs[index].animations);
    this.animation_controllers = new DataSetConnector(count, (index) => this.packs[index].animation_controllers);
    this.attachables = new DataSetConnector(count, (index) => this.packs[index].attachables);
    this.blocks = new DataSetConnector(count, (index) => this.packs[index].blocks);
    this.entities = new DataSetConnector(count, (index) => this.packs[index].entities);
    this.fogs = new DataSetConnector(count, (index) => this.packs[index].fogs);
    this.materials = new DataSetConnector(count, (index) => this.packs[index].materials);
    this.models = new DataSetConnector(count, (index) => this.packs[index].models);
    this.particles = new DataSetConnector(count, (index) => this.packs[index].particles);
    this.sounds = new DataSetConnector(count, (index) => this.packs[index].sounds);
    this.textures = new DataSetConnector(count, (index) => this.packs[index].textures);
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): boolean {
    const uri = doc.uri;

    for (var I = 0; I < this.packs.length; I++) {
      const current = this.packs[I];
      if (uri.startsWith(current.folder)) {
        current.deleteFile(doc.uri);
        current.process(doc);
        return true;
      }
    }

    return false;
  }

  /**
   *
   * @param doc
   * @returns
   */
  get(doc: TextDocument | string): ResourcePack | undefined {
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
  add(folder: string, Context: MCProject | string): ResourcePack {
    const out = new ResourcePack(folder, Context);
    this.packs.push(out);

    return out;
  }
}
