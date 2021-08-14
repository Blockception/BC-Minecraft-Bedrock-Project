//Note: this is kept sync with vscode form of textdocument for easy of use

import { Types } from "bc-minecraft-bedrock-types";

/** */
export interface TextDocument {
  /** */
  readonly uri: string;

  /**
   *
   * @param range
   */
  getText(range?: Types.Range): string;
}
