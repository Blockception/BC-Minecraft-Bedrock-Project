import { Types } from "bc-minecraft-bedrock-types";

/**
 *
 */
export interface IDataSet<T extends Types.Identifiable & Types.Documentated & Types.Locatable> {
  /**
   *
   * @param key
   */
  get(key: string | Types.Identifiable): T | undefined;

  /**
   *
   * @param callbackfn
   * @param thisArg
   */
  forEach(callbackfn: (value: T) => void, thisArg?: any): void;

  /**
   *
   * @param id
   */
  has(id: string | Types.Identifiable): boolean;
}
