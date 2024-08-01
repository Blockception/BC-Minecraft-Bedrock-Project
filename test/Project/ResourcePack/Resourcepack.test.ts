import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { describe } from "mocha";
import { ResourcePack } from '../../../src/Lib/Project';
import { Manifest } from '../../../src/Lib/Internal/Types';

describe("Resourcepack", () => {
  describe("sanity check", () => {
    const RP = new ResourcePack.ResourcePack(
      "c:\\test",
      MCProject.createEmpty(),
      {} as Manifest,
    );

    it("animation controllers", () => {
      expect(
        typeof RP.animation_controllers === "object",
        "animation_controllers"
      ).to.be.true;
    });
    it("animations", () => {
      expect(typeof RP.animations === "object", "animations").to.be.true;
    });
    it("attachables", () => {
      expect(typeof RP.attachables === "object", "attachables").to.be.true;
    });
    it("block_culling", () => {
      expect(typeof RP.block_culling_rules === "object", "block_culling_rules").to.be.true;
    });
    it("context", () => {
      expect(typeof RP.context === "object", "context").to.be.true;
    });
    it("entities", () => {
      expect(typeof RP.entities === "object", "entities").to.be.true;
    });
    it("folder", () => {
      expect(typeof RP.folder === "string", "folder").to.be.true;
    });
    it("materials", () => {
      expect(typeof RP.materials === "object", "functions").to.be.true;
    });
    it("models", () => {
      expect(typeof RP.models === "object", "items").to.be.true;
    });
    it("particles", () => {
      expect(typeof RP.particles === "object", "loot_tables").to.be.true;
    });
    it("sounds", () => {
      expect(typeof RP.sounds === "object", "structures").to.be.true;
    });
    it("textures", () => {
      expect(typeof RP.textures === "object", "trading").to.be.true;
    });
  });

  describe("is", () => {
    const RP = new ResourcePack.ResourcePack(
      "c:\\test",
      MCProject.createEmpty(),
      {} as Manifest,
    );

    it("Is object?", ()=>{
      expect(RP).a("object");
    })

    it("Is resourcepack", ()=>{
      expect(ResourcePack.ResourcePack.is(RP)).to.be.true;
    })
  });
});
