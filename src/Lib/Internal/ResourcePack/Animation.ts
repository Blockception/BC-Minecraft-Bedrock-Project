import { Map } from "../../Types/Map/Map";
import { FormatVersion } from "../Types/FormatVersion";

/** */
export interface Animation {
  /** */
  animation_length?: number;
  /** */
  anim_time_update?: number | string;
  /** */
  loop?: boolean | "hold_on_last_frame";

  /** */
  bones?: Map<any>;
  /** */
  particle_effects?: Map<{ effect?: string; locator?: string } | { effect?: string; locator?: string }[]>;
  /** */
  sound_effects?: Map<{ effect?: string } | { effect?: string }[]>;
  /** */
  timeline?: Map<string | string[]>;
}

export namespace Animation {
  export function is(value: any): value is Animation {
    if (value) {
      if (typeof value.timeline === "object") return true;
      if (typeof value.animation_length === "number") return true;
      if (typeof value.loop === "boolean") return true;
      if (value.loop === "hold_on_last_frame") return true;
    }

    return false;
  }
}

/**
 *
 */
export interface Animations extends FormatVersion {
  /**
   *
   */
  format_version: string;

  /**
   *
   */
  animations: {
    /**
     *
     */
    [animation: string]: Animation;
  };
}

export namespace Animations {
  export function is(value: any): value is Animations {
    if (value && typeof value.format_version === "string" && typeof value.animations === "object") return true;

    return false;
  }
}
