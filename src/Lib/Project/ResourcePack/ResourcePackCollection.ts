import { MCProject } from "bc-minecraft-project";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { ResourcePack } from "./ResourcePack";

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
import { Types } from "bc-minecraft-bedrock-vanilla-data";
import { DataSetConnector } from "../../Types/DataSet/DataSetConnector";

/** */
export class ResourcePackCollection {
  /** */
  public packs: ResourcePack[];

  /**The collection of  animations*/
  readonly animations: DataSetConnector<Animation.Animation | Types.ResourcePack.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSetConnector<AnimationController.AnimationController | Types.ResourcePack.AnimationController>;
  /**The collection of animations controllers*/
  readonly attachables: DataSetConnector<Attachable.Attachable>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity | Types.ResourcePack.Entity>;
  /**The collection of fogs*/
  readonly fogs: DataSetConnector<Fog.Fog | Types.ResourcePack.Fog>;
  /**The collection of materials*/
  readonly materials: DataSetConnector<Material.Material | Types.ResourcePack.Material>;
  /**The collection of models*/
  readonly models: DataSetConnector<Model.Model | Types.ResourcePack.Model>;
  /**The collection of models*/
  readonly particles: DataSetConnector<Particle.Particle | Types.ResourcePack.Particle>;
  /**The collection of sounds*/
  readonly sounds: DataSetConnector<Sound.Sound | Types.ResourcePack.Sound>;
  /**The collection of textures*/
  readonly textures: DataSetConnector<Texture.Texture | Types.ResourcePack.Texture>;

  /**
   *
   */
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
    this.attachables = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].attachables.get(id);
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
    this.fogs = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].fogs.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.materials = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].materials.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.models = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].models.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.particles = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].particles.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.sounds = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].sounds.get(id);
        if (p) return p;
      }

      return undefined;
    });
    this.textures = DataSetConnector.create((id: string) => {
      for (let I = 0; I < this.packs.length; I++) {
        const p = this.packs[I].textures.get(id);
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
