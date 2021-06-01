/**The type that checks what the general type of a file is*/
export enum GeneralDataType {
  /**marks that the file is most likely a bp file*/
  behavior_pack,
  /**marks that the file is most likely a rp file*/
  resource_pack,
  /**marks that the file is most likely a world file*/
  world,
  /**marks that the file is most likely a skin_pack file*/
  skin_pack,

  /**UNKNOWN FILE, probally good to ignore it*/
  unknown,
}
