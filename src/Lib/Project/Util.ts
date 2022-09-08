import { Pack } from "../Types/Pack/Pack";
import { PackType } from "./Enum";
import { BehaviorPack, ResourcePack } from "./index";
import { WorldPack } from "./World/WorldPack";

/**
 *
 */
export namespace Util {
  /**
   *
   * @param pack
   * @returns
   */
  export function GetPackType(pack: Pack): PackType {
    return pack.type;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function IsResourcePack(pack: Pack): pack is ResourcePack.ResourcePack {
    return pack.type === PackType.resource_pack;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function IsBehaviorPack(pack: Pack): pack is BehaviorPack.BehaviorPack {
    return pack.type === PackType.behavior_pack;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function IsWorldPack(pack: Pack): pack is WorldPack {
    return pack.type === PackType.world;
  }
}
