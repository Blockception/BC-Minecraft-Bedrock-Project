import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../TextDocument/TextDocument";

/** */
export namespace Documentation {
  /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
   * @param receiver The receiving object
   * @param doc The text document to read from
   * @param ifDefault The default text is nothing is found in the document*/
  export function setDoc(receiver: Types.Documentated, doc: TextDocument, ifDefault: string | (() => string) | undefined = undefined): void {
    receiver.documentation = getDoc(doc, ifDefault);
  }

  /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
   * @param doc The text document to read from
   * @param ifDefault The default text is nothing is found in the document*/
  export function getDoc(doc: TextDocument, ifDefault: string | (() => string) | undefined = undefined): string | undefined {
    const line = doc.getText();
    let index = line.indexOf("\n");
    if (index < 0) index = line.length;

    //Comment
    if (line.startsWith("//")) {
      return line.substring(2, index).trim();

      //Mcfunction comment
    } else if (line.startsWith("#")) {
      return line.substring(1, index).trim();

      //Default generation provided
    } else if (ifDefault) {
      return typeof ifDefault === "string" ? ifDefault : ifDefault();
    }

    return undefined;
  }
}
