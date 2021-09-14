import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { ResourcePack } from "../../../src/main";

describe("Resourcepack", () => {
  it("sanity check", () => {
    const RP = new ResourcePack.ResourcePack("c:\\test", MCProject.createEmpty());

    expect(typeof RP.animation_controllers === "object", "animation_controllers").to.be.true;
    expect(typeof RP.animations === "object", "animations").to.be.true;
    expect(typeof RP.attachables === "object", "animations").to.be.true;
    expect(typeof RP.blocks === "object", "blocks").to.be.true;
    expect(typeof RP.context === "object", "context").to.be.true;
    expect(typeof RP.entities === "object", "entities").to.be.true;
    expect(typeof RP.folder === "string", "folder").to.be.true;
    expect(typeof RP.materials === "object", "functions").to.be.true;
    expect(typeof RP.models === "object", "items").to.be.true;
    expect(typeof RP.particles === "object", "loot_tables").to.be.true;
    expect(typeof RP.sounds === "object", "structures").to.be.true;
    expect(typeof RP.textures === "object", "trading").to.be.true;
  });

  it("is", () => {
    const RP = new ResourcePack.ResourcePack("c:\\test", MCProject.createEmpty());

    expect(RP).to.not.be.undefined;
    expect(typeof RP === "object").to.be.true;
    expect(ResourcePack.ResourcePack.is(RP)).to.be.true;
  });
});
