/** */
export interface Animation {
  /** */
  animation_length?: number;
  /** */
  anim_time_update?: number | string;
  /** */
  loop?: boolean | "hold_on_last_frame";

  /** */
  bones?: {
    [bone: string]: any;
  };
  /** */
  particle_effects?: {
    [particle_effect: string]: { effect: string };
  };
  /** */
  sound_effects?: {
    [sound_effect: string]: { effect: string };
  };
  /** */
  timeline?: {
    [time: string]: string | string[];
  };
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
export interface Animations {
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
