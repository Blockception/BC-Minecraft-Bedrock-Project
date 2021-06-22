export interface Pack {
  /**The folder path of the pack*/
  readonly folder: string;

  /**
   *
   * @param doc
   */
  process(doc: TextDocument);
}
