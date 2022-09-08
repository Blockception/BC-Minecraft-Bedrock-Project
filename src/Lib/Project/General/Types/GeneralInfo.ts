import { Types } from "bc-minecraft-bedrock-types";
import { Text } from '../../../Types/Text';

/**
 *
 */
export interface GeneralInfo extends Types.BaseObject {}

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
    id = Text.UnQuote(id);

    return {
      id: id,
      location: location,
      documentation: documentation,
    };
  }
}
