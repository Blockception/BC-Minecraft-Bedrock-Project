import { PackType } from "../../Project/include";
import { ProjectContext } from "../../Types/ProjectContext/ProjectContext";
import { Json } from "../Json";

/**
 *
 */
export interface Manifest {
  /**
   *
   */
  format_version: string;
  /**
   *
   */
  header: ManifestHeader;
  /**
   *
   */
  modules?: ManifestModule[];
  /**
   *
   */
  metadata?: ManifestMetadata;
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
  authors?: string[];
  license?: string;
  url?: string;
  generated_with?: {
    [tool_name: string]: string[]
  }
}

/** */
export namespace Manifest {

  export function is(value: any): value is Manifest {
    if (typeof value === "object") {
      if (typeof value.format_version !== "number") return false;
      if (typeof value.header !== "object") return false;

      return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function IsWorldManifest(m: Manifest): boolean {
    const modules = m.modules;
    if (modules === undefined) return false;

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
    const modules = m.modules;
    if (modules === undefined) return false;

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
    const modules = m.modules;
    if (modules === undefined) return false;

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
    const modules = m.modules;
    if (modules === undefined) return false;

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
  export function GetManifest(uri: string, ProjectContext: ProjectContext): Manifest | undefined {
    const doc = ProjectContext.getDocument(uri);

    if (doc) return Json.To<Manifest>(doc);

    return undefined;
  }
}
