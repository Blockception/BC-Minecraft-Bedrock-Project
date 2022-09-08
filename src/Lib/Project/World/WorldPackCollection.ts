import { MCProject } from "bc-minecraft-project";
import { PackCollection } from "../../Types";
import { WorldPack } from "./WorldPack";

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
