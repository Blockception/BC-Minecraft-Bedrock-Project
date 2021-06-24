import { Location } from "../Location/Location";

export interface Locatable {
  /**The location of the object in memory*/
  location: Location;
}

/**
 *
 */
export namespace Locatable {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Locatable {
    if (value && Location.is(value.location)) {
      return true;
    }

    return false;
  }

  /**
   *
   * @returns
   */
  export function empty(): Locatable {
    return {
      location: { uri: "", position: 0 },
    };
  }
}
