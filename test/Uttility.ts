import { MCIgnore } from "bc-minecraft-project";
import { readFileSync } from "fs";
import { ProjectContext } from "../src/Lib/Types/ProjectContext/ProjectContext";
import { TextDocument } from "../src/Lib/Types/TextDocument/TextDocument";

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
