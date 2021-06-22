import { JsonPath } from "./JsonPath";
import { Position } from "./Position";

/**
 *
 */
export interface Location {
  /**
   *
   */
  uri: string;

  /**
   *
   */
  position: Position | JsonPath | number;
}

/**
 *
 */
export namespace Location {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Location {
    if (value) {
      if (value.uri && value.position) return true;
    }

    return false;
  }
}
