import { TextDocument } from "../TextDocument/TextDocument";

/** */
export interface Documentated {
  /** */
  documentation?: string;
}

/** */
export namespace Documentated {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Documentated {
    if (value && typeof value.documentation === "string") {
      return true;
    }

    return false;
  }
}

/** */
export namespace Documentation {
  /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
   * @param receiver The receiving object
   * @param doc The text document to read from
   * @param ifDefault The default text is nothing is found in the document*/
  export function setDoc(receiver: Documentated, doc: TextDocument, ifDefault: string | (() => string) | undefined = undefined): void {
    receiver.documentation = getDoc(doc, ifDefault);
  }

  /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
   * @param doc The text document to read from
   * @param ifDefault The default text is nothing is found in the document*/
  export function getDoc(doc: TextDocument, ifDefault: string | (() => string) | undefined = undefined): string | undefined {
    const line = doc.getText();
    let index = line.indexOf("\n");
    if (index < 0) index = line.length;

    if (line.startsWith("//")) {
      return line.substring(2, index).trim();
    } else if (line.startsWith("#")) {
      return line.substring(1, index).trim();
    } else if (ifDefault) {
      return typeof ifDefault === "string" ? ifDefault : ifDefault();
    }

    return undefined;
  }
}
