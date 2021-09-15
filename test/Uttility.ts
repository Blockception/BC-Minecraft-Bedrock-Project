import { MCIgnore } from "bc-minecraft-project";
import { readFileSync } from "fs";
import { ProjectContext, TextDocument } from "../src/main";

export class TextProjectContext implements ProjectContext {
  getDocument(uri: string): TextDocument {
    return {
      getText: (range) => readFileSync(uri).toString(),
      uri: uri,
    };
  }

  getFiles(folder: string, ignores: MCIgnore): string[] {
    return [];
  }
}
