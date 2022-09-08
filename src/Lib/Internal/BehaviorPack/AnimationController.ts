import { Map } from "../../Types/Map";
import { FormatVersion } from "../Types/FormatVersion";
import * as General from '../General/Controllers/State';

/** */
export interface AnimationControllers extends FormatVersion {
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
    if (typeof value === "object" && typeof value.states === "object") return true;

    return false;
  }
}


export interface State extends General.State {
}

/** */
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
