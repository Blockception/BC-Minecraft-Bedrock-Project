import { Map } from "../../Types/Map";
import { Conditional } from "../Types/Conditional";

/** */
export interface AnimationControllers {
  /** */
  format_version: string;
  /** */
  animation_controllers: {
    /** */
    [controller: string]: AnimationController;
  };
}

/** */
export namespace AnimationControllers {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is AnimationControllers {
    if (typeof value === "object" && typeof value.format_version === "string" && typeof value.animation_controllers === "object") return true;

    return false;
  }
}

/** */
export interface AnimationController {
  /** */
  initial_state?: string;
  /** */
  states: Map<State>;
}

/** */
export namespace AnimationController {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is AnimationController {
    if (typeof value === "object" && Array.isArray(value.states)) return true;

    return false;
  }
}

/** */
export interface State {
  /** */
  animations?: Conditional[];
  /** */
  on_entry?: string[];
  /** */
  on_exit?: string[];
  /** */
  transitions?: Conditional[];
}

/**
 *
 */
export namespace State {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is State {
    if (typeof value === "object") return true;

    return false;
  }
}
