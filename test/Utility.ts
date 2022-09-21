import { MCIgnore } from "bc-minecraft-project";
import { readFileSync } from "fs";
import { ProjectContext } from "../src/Lib/Types/ProjectContext";
import { TextDocument } from "../src/Lib/Types/TextDocument";

export class TextProjectContext implements ProjectContext {
  getDocument(uri: string): TextDocument {
    return {
      getText: (range) => readFileSync(uri).toString(),
      uri: uri,
    };
  }

  getFiles(folder: string, pattern : string[], ignores: MCIgnore): string[] {
    return [];
  }
}
