import { MCProject } from "bc-minecraft-project";
import { WorldPack } from "./WorldPack";
import { PackCollection } from "../../Types/Pack/PackCollection";

/** */
export class WorldPackCollection extends PackCollection<WorldPack> {

  constructor() {
    super();
  }

  /**
   *
   * @param folder
   * @param Context
   * @returns
   */
  add(folder: string, Context: MCProject | string): WorldPack {
    const out = new WorldPack(folder, Context);
    this.packs.push(out);

    return out;
  }
}
