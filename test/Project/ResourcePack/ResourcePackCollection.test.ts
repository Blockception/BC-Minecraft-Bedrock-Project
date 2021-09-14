import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { ResourcePackCollection } from "../../../src/Lib/Project/ResourcePack/include";

describe("ResourcePackCollection", () => {
  it("sanity check", () => {
    const pc = new ResourcePackCollection();
    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(0);

    pc.add("c:\\project\\", MCProject.createEmpty());

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(1);

    expect(pc.delete("c:\\project\\")).to.be.true;

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(0);
  });
});
