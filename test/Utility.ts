import { readFileSync } from "fs";
import { Documents } from "../src/Lib/Types/ProjectContext";
import { TextDocument } from "../src/Lib/Types/TextDocument";

export class TextProjectContext implements Documents<TextDocument> {
  getDocument(uri: string): TextDocument {
    return {
      getText: () => readFileSync(uri).toString(),
      uri: uri,
    };
  }

  getFiles(): string[] {
    return [];
  }
}
