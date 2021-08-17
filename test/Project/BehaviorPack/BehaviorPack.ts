import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { BehaviorPack } from "../../../src/main";

describe("BehaviorPack", () => {
  it("sanity check", () => {
    const BP = new BehaviorPack.BehaviorPack("c:\\test", MCProject.createEmpty());

    expect(typeof BP.animation_controllers === "object", "animation_controllers").to.be.true;
    expect(typeof BP.animations === "object", "animations").to.be.true;
    expect(typeof BP.blocks === "object", "blocks").to.be.true;
    expect(typeof BP.context === "object", "context").to.be.true;
    expect(typeof BP.entities === "object", "entities").to.be.true;
    expect(typeof BP.folder === "string", "folder").to.be.true;
    expect(typeof BP.functions === "object", "functions").to.be.true;
    expect(typeof BP.items === "object", "items").to.be.true;
    expect(typeof BP.loot_tables === "object", "loot_tables").to.be.true;
    expect(typeof BP.structures === "object", "structures").to.be.true;
    expect(typeof BP.trading === "object", "trading").to.be.true;
  });

  it("is", () => {
    const BP = new BehaviorPack.BehaviorPack("c:\\test", MCProject.createEmpty());

    expect(BP).to.not.be.undefined;
    expect(typeof BP === "object").to.be.true;
    expect(BehaviorPack.BehaviorPack.is(BP)).to.be.true;
  });
});
