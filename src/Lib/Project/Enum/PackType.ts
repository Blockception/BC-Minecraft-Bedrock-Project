export enum PackType {
  resource_pack,
  behavior_pack,
  skin_pack,
  world,
  unknown,
}

export namespace PackType {
  export function detect(uri: string): PackType;
}
