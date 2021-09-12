import { FormatVersion } from "../Types/FormatVersion";

/** */
export interface RenderControllers extends FormatVersion {
  /** */
  format_version: string;
  /** */
  render_controllers: {
    /** */
    [controller: string]: RenderController;
  };
}

/**
 *
 */
export namespace RenderControllers {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is RenderControllers {
    if (typeof value === "object") {
      if (typeof value.format_version === "string" && typeof value.render_controllers === "object") {
        return true;
      }
    }

    return false;
  }
}

/** */
export interface RenderController {
  /** */
  array?: {
    /** */
    materials?: ArraySpec;
    /** */
    geometries?: ArraySpec;
    /** */
    textures?: ArraySpec;
  };
  /** */
  geometry?: string;
  /** */
  materials?: MaterialSpec[];
  /** */
  textures?: string[];
}

/** */
export interface MaterialSpec {
  /** */
  [materialPattern: string]: string;
}

/** */
export interface ArraySpec {
  /** */
  [arrayID: string]: string[];
}
