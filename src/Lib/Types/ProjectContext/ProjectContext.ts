import { MCIgnore } from "bc-minecraft-project/lib/src/Lib/mcignore";
import { TextDocument } from "../TextDocument/include";

/**The context of a project, used to retrieve files*/
export interface ProjectContext {
  /**Returns a textdocument object or undefined if something went wrong or nothing exists
   * @param uri The document uri to read*/
  getDocument(uri: string): TextDocument | undefined;

  /**Returns all files in the given directory and sub directories.
   * @param folder The folder to start the search from
   * @param ignores The project settings for ignores or includements*/
  getFiles(folder: string, ignores: MCIgnore): string[];
}
