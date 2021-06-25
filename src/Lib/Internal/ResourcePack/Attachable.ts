import { FormatVersion } from "../Types/FormatVersion";
import { Definition, ScriptContainer } from "../Types/include";

/** */
export interface Attachable extends FormatVersion {
  /** */
  readonly format_version: string;
  /** */
  "minecraft:attachable": AttachableContainer;
}

/** */
export interface AttachableContainer extends ScriptContainer {
  /** */
  description: AttachableDescription;
  /** */
  animations?: Definition;
  /** */
  animation_controllers?: string[];
  /** */
  particle_effects?: Definition;
  /** */
  geometry?: Definition;
  /** */
  sound_effects?: Definition;
  /** */
  textures?: Definition;
}

/** */
export interface AttachableDescription {
  /** */
  identifier: string;
  /** */
  materials?: {
    /** */
    default?: string;
    /** */
    enchanted?: string;
  };
}

/** */
export namespace Attachable {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Attachable {
    if (value && typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:attachable"] === "object") {
      const desc = value["minecraft:attachable"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") return true;
    }

    return false;
  }
}
