import { Types } from "bc-minecraft-bedrock-types";

/**
 *
 */
export interface GeneralInfo extends Types.Locatable, Types.Identifiable, Types.Documentated {}

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
  export function create(id: string, location: Types.Location, documentation: string | undefined = undefined): GeneralInfo {
    return {
      id: id,
      location: location,
      documentation: documentation,
    };
  }
}
