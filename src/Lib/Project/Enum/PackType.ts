/** */
export enum PackType {
  /** */
  resource_pack,
  /** */
  behavior_pack,
  /** */
  skin_pack,
  /** */
  world,
  /** */
  unknown,
}

/**Detects the type of general data from the given uri
 * @param uri The filepath to examine, expects slashes to be '/'*/
export namespace PackType {
  /** */
  export const BehaviorPackMatch: RegExp = /[\/\\].*(behav(ior|iour)([ _-]|)pack|behav(ior|iour)|bp).*[\/\\]/i;
  /** */
  export const ResourcePackMatch: RegExp = /[\/\\].*(resource([ _-]|)pack|resource|rp).*[\/\\]/i;
  /** */
  export const WorldMatch: RegExp = /[\/\\].*(world([ _-]|)template|world|wp|db).*[\/\\]/i;
  /** */
  export const SkinPack: RegExp = /[\/\\].*(skin([ _-]|)pack).*[\/\\]/i;

  /**
   *
   * @param uri
   */
  export function detect(uri: string): PackType {
    if (BehaviorPackMatch.test(uri)) return PackType.behavior_pack;
    if (ResourcePackMatch.test(uri)) return PackType.resource_pack;
    if (WorldMatch.test(uri)) return PackType.world;
    if (SkinPack.test(uri)) return PackType.skin_pack;

    return PackType.unknown;
  }
}
