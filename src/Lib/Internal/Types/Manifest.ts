import { promises, readFileSync } from "fs";
import { jsonc } from "jsonc";
import { PackType } from "../../Project/include";
import { TextDocument } from "../../Types/include";
import { Json } from "../Json";

/**
 *
 */
export interface Manifest {
  /**
   *
   */
  format_verison: string;
  /**
   *
   */
  header: ManifestHeader;
  /**
   *
   */
  modules: ManifestModule[];
  /**
   *
   */
  metadata: ManifestMetadata;
}

/**
 *
 */
export interface ManifestHeader {
  /** */
  name: string;
  /** */
  description: string;
  /** */
  uuid: string;
  /** */
  version: number[];
  /** */
  lock_template_options: boolean;
  /** */
  base_game_version: number[];
}

/** */
export interface ManifestModule {
  /** */
  type: string;
  /** */
  uuid: string;
  /** */
  version: number[];
}

/** */
export namespace ManifestModule {
  /** */
  export const TypeResource = "resources";
  /** */
  export const TypeData = "data";
  /** */
  export const TypeWorld = "world_template";
  /** */
  export const TypeSkinPack = "skin_pack";
}

/** */
export interface ManifestMetadata {
  /** */
  authors: string[];
}

/** */
export namespace Manifest {
  /**
   *
   * @param m
   * @returns
   */
  export function IsWorldManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeWorld) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function IsResourceManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeResource) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function IsBehaviorManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeData) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function IsSkinpackManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeSkinPack) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function DetectType(m: Manifest): PackType {
    if (!m.modules) return PackType.unknown;

    for (let I = 0; I < m.modules.length; I++) {
      const mod = m.modules[I];

      switch (mod.type) {
        case ManifestModule.TypeData:
          return PackType.behavior_pack;

        case ManifestModule.TypeResource:
          return PackType.resource_pack;

        case ManifestModule.TypeWorld:
          return PackType.world;

        case ManifestModule.TypeSkinPack:
          return PackType.skin_pack;
      }
    }

    return PackType.unknown;
  }

  /**
   *
   * @param uri
   * @returns
   */
  export function GetManifestSync(uri: string): Manifest | undefined {
    const doc: TextDocument = {
      uri: uri,
      getText(): string {
        return readFileSync(this.uri).toString();
      },
    };

    return Json.To<Manifest>(doc);
  }

  /**
   *
   * @param uri
   * @returns
   */
  export async function GetManifest(uri: string): Promise<Manifest | undefined> {
    const readFile = promises.readFile(uri);

    return readFile.then((buffer) => {
      const data = buffer.toString();

      return Json.To<Manifest>(data);
    });
  }
}
