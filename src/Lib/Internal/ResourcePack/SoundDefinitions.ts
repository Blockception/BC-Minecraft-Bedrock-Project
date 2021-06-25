import { Map } from "../../Types/Map/Map";
import { FormatVersion } from "../Types/FormatVersion";

/** */
export interface SoundDefinitions extends FormatVersion {
  /** */
  format_version: string;
  /** */
  sound_definitions: Map<SoundSpec>;
}

/** */
export interface SoundSpec {
  /** */
  category: string;
  /** */
  sounds: (string | {})[];
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
    }

    return false;
  }
}
