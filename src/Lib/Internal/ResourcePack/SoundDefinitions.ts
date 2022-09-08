import { Map } from "../../Types/Map";
import { FormatVersion } from "../Types/FormatVersion";

/** */
export interface SoundDefinitions extends FormatVersion {
  /** */
  format_version: string;
  /** */
  sound_definitions: Map<SoundDefinition>;
}

/** */
export interface SoundDefinition {
  /** */
  category: string;
  /** */
  sounds: (string | SoundSpec)[];
}

/** */
export interface SoundSpec {
  /**The relative path to the file */
  name?: string;

  /** */
  load_on_low_memory?: boolean;

  /** */
  stream?: boolean;
}

/** */
export namespace SoundDefinitions {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is SoundDefinitions {
    if (typeof value === "object" && typeof value.format_version === "string" && typeof value.sound_definitions === "object") {
      return true;
    }

    return false;
  }
}
