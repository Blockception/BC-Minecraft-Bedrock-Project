import { MCProject } from "bc-minecraft-project";
import { ResourcePackCollection } from "../../../src/Lib/Project/ResourcePack";
import { Manifest } from '../../../src/Lib/Internal/Types';

describe("ResourcePackCollection", () => {
  it("sanity check", () => {
    const pc = new ResourcePackCollection();
    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(0);

    pc.add("c:\\project\\", MCProject.createEmpty(), {} as Manifest);

    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(1);

    expect(pc.delete("c:\\project\\")).toBeTruthy();

    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(0);
  });
});
