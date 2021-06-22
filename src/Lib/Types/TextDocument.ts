//Note: this is kept sync with vscode form of textdocument for easy of use

/**
 *
 */
export interface TextDocument {
  readonly uri: string;

  getText(range?: Range): string;
}
