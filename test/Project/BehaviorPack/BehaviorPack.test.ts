import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { BehaviorPack } from "../../../src/main";

describe("BehaviorPack", () => {
  describe("sanity check", () => {
    const BP = new BehaviorPack.BehaviorPack(
      "c:\\test",
      MCProject.createEmpty()
    );

    it("animation controllers", () => {
      expect(
        typeof BP.animation_controllers === "object",
        "animation_controllers"
      ).to.be.true;
    });
    
    it("animations", () => {
      expect(typeof BP.animations === "object", "animations").to.be.true;
    });

    it("blocks", () => {
      expect(typeof BP.blocks === "object", "blocks").to.be.true;
    });
    
    it("context", () => {
      expect(typeof BP.context === "object", "context").to.be.true;
    });

    it("entities", () => {
      expect(typeof BP.entities === "object", "entities").to.be.true;
    });

    it("folder", () => {
      expect(typeof BP.folder === "string", "folder").to.be.true;
    });

    it("functions", () => {
      expect(typeof BP.functions === "object", "functions").to.be.true;
    });

    it("items", () => {
      expect(typeof BP.items === "object", "items").to.be.true;
    });

    it("loot_tables", () => {
      expect(typeof BP.loot_tables === "object", "loot_tables").to.be.true;
    });

    it("structures", () => {
      expect(typeof BP.structures === "object", "structures").to.be.true;
    });

    it("trading", () => {
      expect(typeof BP.trading === "object", "trading").to.be.true;
    });
  });

  describe("is", () => {
    const BP = new BehaviorPack.BehaviorPack(
      "c:\\test",
      MCProject.createEmpty()
    );

    it("Is not undefined", ()=>{
      expect(BP).to.not.be.undefined;
    })

    it("Is not an object", ()=>{
      expect(typeof BP === "object").to.be.true;
    })

    it("Is a BehaviorPack", ()=>{
      expect(BehaviorPack.BehaviorPack.is(BP)).to.be.true;
    })
  });
});
