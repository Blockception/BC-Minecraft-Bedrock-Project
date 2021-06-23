/** */
export interface Animation {
  /** */
  animation_length?: number;
  /** */
  loop?: boolean;
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
