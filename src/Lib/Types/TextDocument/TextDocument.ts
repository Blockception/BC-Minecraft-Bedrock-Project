//Note: this is kept sync with vscode form of textdocument for easy of use
import { Range } from "../Range/Range";

/** */
export interface TextDocument {
  /** */
  readonly uri: string;

  /**
   *
   * @param range
   */
  getText(range?: Range): string;
}
