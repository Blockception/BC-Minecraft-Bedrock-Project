import { Documentated, Identifiable, Locatable, Location } from "../../../Types/include";

/**
 *
 */
export interface GeneralInfo extends Locatable, Identifiable, Documentated {}

/**
 *
 */
export namespace GeneralInfo {
  /**
   *
   * @param id
   * @param location
   * @param documentation
   * @returns
   */
  export function create(id: string, location: Location, documentation: string | undefined = undefined): GeneralInfo {
    return {
      id: id,
      location: location,
      documentation: documentation,
    };
  }
}
