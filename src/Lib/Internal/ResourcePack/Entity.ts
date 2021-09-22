import { FormatVersion } from "../Types/FormatVersion";
import { Definition, ScriptContainer } from "../Types/include";

/** */
export interface Entity extends FormatVersion {
  /** */
  readonly format_version: string;
  /** */
  "minecraft:entity": EntityContainer;
}

/** */
export interface EntityContainer extends ScriptContainer {
  /** */
  description: EntityDescription;
  /** */
  animations?: Definition;
  /** */
  animation_controllers?: string[];
  /** */
  particle_effects?: Definition;
  /** */
  geometry?: Definition;
  /** */
  render_controller?: (string | Definition)[];
  /** */
  sound_effects?: Definition;
  /** */
  textures?: Definition;
}

/** */
export interface EntityDescription {
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
export namespace Entity {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Entity {
    if (value && typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:entity"] === "object") {
      const desc = value["minecraft:entity"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") return true;
    }

    return false;
  }
}
