import { MCProject } from "bc-minecraft-project";
import { Container } from "../../Types/include";
import { Pack } from "../../Types/Pack";

export class ResourcePack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**
   *
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from
   */
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);
  }
}
