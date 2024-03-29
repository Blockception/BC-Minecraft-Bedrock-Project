import { Location } from "bc-minecraft-bedrock-types/lib/src/types";
import { DefinedUsing, Molang } from "bc-minecraft-molang";
import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { BehaviorPack } from "../../src/Lib/Project/BehaviorPack";
import { ResourcePack } from "../../src/Lib/Project/ResourcePack/ResourcePack";
import { ProjectData } from "../../src/Lib/Project/ProjectData";
import { TextProjectContext } from "../Utility";
import { describe } from "mocha";

describe("ProjectData", () => {
  describe("Sanity Check", () => {
    const P = new ProjectData(new TextProjectContext());

    it("P is not undefined", () => {
      expect(P).to.not.be.undefined;
    });

    describe("BehaviorPacks", () => {
      it("Is not undefined", () => {
        expect(P.BehaviorPacks).to.not.be.undefined;
      });

      it("Has packs", () => {
        expect(P.BehaviorPacks.packs).to.not.be.undefined;
      });
    });

    describe("ResourcePacks", () => {
      it("Is not undefined", () => {
        expect(P.ResourcePacks).to.not.be.undefined;
      });

      it("Has packs", () => {
        expect(P.ResourcePacks.packs).to.not.be.undefined;
      });
    });

    describe("General", () => {
      it("Is not undefined", () => {
        expect(P.General).to.not.be.undefined;
      });

      it("has fakeEntities", () => {
        expect(P.General.fakeEntities).to.not.be.undefined;
      });

      it("has objectives", () => {
        expect(P.General.objectives).to.not.be.undefined;
      });

      it("has tags", () => {
        expect(P.General.tags).to.not.be.undefined;
      });

      it("has tickingAreas", () => {
        expect(P.General.tickingAreas).to.not.be.undefined;
      });
    });
  });

  describe("Behaviourpack", () => {
    var P: ProjectData;
    var pack: BehaviorPack;

    beforeEach(() => {
      P = new ProjectData(new TextProjectContext());
      pack = P.BehaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty());
    });

    it("Has 1 bp", () => {
      expect(P.BehaviorPacks.count()).to.equal(1);
    });

    describe("get", () => {
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      beforeEach(() => {
        pack.loot_tables.set({
          id: "empty.loot.json",
          location: Location.create(uri),
        });
      });

      it("not undefined", () => {
        const data = P.get(uri);
        expect(data).to.not.undefined;
      });

      it("Is behaviorpack", () => {
        const data = P.get(uri);
        expect(BehaviorPack.is(data)).to.be.true;
      });

      it("Has loot_tables", () => {
        const data = P.get(uri);
        if (!BehaviorPack.is(data)) expect.fail();
        expect(data.loot_tables.has("empty.loot.json")).to.be.true;
      });
    });

    it("Remove File", () => {
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.BehaviorPacks.packs).to.not.undefined;
      expect(P.BehaviorPacks.loot_tables).to.not.undefined;
      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.true;

      expect(P.deleteFile(uri), "Expected operation to be successfull").to.be.true;

      expect(P.BehaviorPacks.packs).to.not.undefined;
      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.false;
    });

    it("Remove Folder", () => {
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.BehaviorPacks.loot_tables).to.not.undefined;
      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json"), "started with loottable").to.be.true;

      expect(P.deleteFolder("c:\\temp\\bp\\loot_tables"), "Expected operation to be successfull").to.be.true;

      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json"), "ended without loottable").to.be.false;
    });

    it("Remove Folder - Entire Pack", () => {
      const pack = P.BehaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty());

      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.true;

      expect(P.deleteFolder("c:\\temp\\bp"), "Expected operation to be successfull").to.be.true;

      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.false;
      expect(P.BehaviorPacks.count()).to.be.equal(0);
    });
  });

  describe("Resourcepack", () => {
    var P: ProjectData;
    var pack: ResourcePack;

    beforeEach(() => {
      P = new ProjectData(new TextProjectContext());
      pack = P.ResourcePacks.add("c:\\temp\\rp", MCProject.createEmpty());
    });

    it("add", () => {
      expect(P.ResourcePacks.count()).to.equal(1);
    });

    it("get", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      const data = P.get(uri);

      if (!data) {
        expect.fail("expacted a pack");
      } else {
        if (ResourcePack.is(data)) {
          expect(data.sounds.has(id)).to.be.true;
        } else {
          expect.fail("expacted a rp pack");
        }
      }
    });

    it("Remove File", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      expect(P.ResourcePacks.sounds.has(id)).to.be.true;

      expect(P.deleteFile(uri), "Expected operation to be successfull").to.be.true;
      expect(P.ResourcePacks.sounds.has(id)).to.be.false;
    });

    it("Remove Folder", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      expect(P.ResourcePacks.sounds.has(id)).to.be.true;
      expect(P.deleteFolder("c:\\temp\\rp\\sounds"), "Expected operation to be successfull").to.be.true;

      expect(P.ResourcePacks.sounds.has(id)).to.be.false;
    });

    it("Remove Folder - Entire Pack", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      expect(P.ResourcePacks.sounds.has(id)).to.be.true;

      expect(P.deleteFolder("c:\\temp\\rp"), "Expected operation to be successfull").to.be.true;

      expect(P.ResourcePacks.sounds.has(id)).to.be.false;
      expect(P.ResourcePacks.count()).to.be.equal(0);
    });
  });

  describe("General", () => {
    var P: ProjectData;

    beforeEach(() => {
      P = new ProjectData(new TextProjectContext());
    });

    it("Remove File", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "init";

      P.General.tags.set({ id: id, location: Location.create(uri) });

      expect(P.General.tags.has(id)).to.be.true;

      expect(P.deleteFile(uri), "Expected operation to be successfull").to.be.true;

      expect(P.General.tags.has(id)).to.be.false;
    });
  });

  describe("find", () => {
    const data = new ProjectData(new TextProjectContext());

    const bp = data.BehaviorPacks.add("c:\\bp", MCProject.createEmpty());
    const rp = data.ResourcePacks.add("c:\\rp", MCProject.createEmpty());

    const loc = { uri: "", position: 0 };
    const molang = Molang.MolangFullSet.create();
    const doc = "Documentation";
    const emptyDefinedUsing = DefinedUsing.create<string>();

    bp.animation_controllers.set({
      animations: emptyDefinedUsing,
      id: "bp.animation_controller",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    bp.animations.set({
      id: "bp.animation",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    bp.blocks.set({
      id: "bp.block",
      location: loc,
      molang: molang,
      documentation: doc,
      states: [],
    });
    bp.entities.set({
      id: "bp.entity",
      location: loc,
      molang: molang,
      documentation: doc,
      animations: emptyDefinedUsing,
      events: [],
      families: [],
      groups: [],
      properties: [],
    });
    bp.functions.set({ id: "bp.function", location: loc, documentation: doc });
    bp.items.set({
      id: "bp.item",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    bp.loot_tables.set({
      id: "bp.loot_table",
      location: loc,
      documentation: doc,
    });
    bp.structures.set({
      id: "bp.structure",
      location: loc,
      documentation: doc,
    });
    bp.trading.set({ id: "bp.trading", location: loc, documentation: doc });

    rp.animation_controllers.set({
      animations: emptyDefinedUsing,
      id: "rp.animation_controller",
      location: loc,
      molang: molang,
      documentation: doc,
      particles: emptyDefinedUsing,
      sounds: emptyDefinedUsing,
    });
    rp.animations.set({
      id: "rp.animation",
      location: loc,
      molang: molang,
      documentation: doc,
      particles: emptyDefinedUsing,
      sounds: emptyDefinedUsing,
    });
    rp.attachables.set({
      animations: emptyDefinedUsing,
      id: "rp.attachable",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    rp.block_culling_rules.set({ id: "rp.block_culling_rules", location: loc, documentation: doc, affected_bones: [] });
    rp.entities.set({
      animations: emptyDefinedUsing,
      id: "rp.entity",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    rp.fogs.set({ id: "rp.fog", location: loc, documentation: doc });
    rp.materials.set({ id: "rp.material", location: loc, documentation: doc });
    rp.models.set({ id: "rp.model", location: loc, documentation: doc, bones: [] });
    rp.particles.set({ id: "rp.particle", location: loc, documentation: doc });
    rp.render_controllers.set({
      id: "rp.render_controller",
      location: loc,
      documentation: doc,
      molang: molang,
    });
    rp.sounds.set({ id: "rp.sound", location: loc, documentation: doc });
    rp.textures.set({ id: "rp.texture", location: loc, documentation: doc });

    const ids = [
      "bp.animation_controller",
      "bp.animation",
      "bp.block",
      "bp.entity",
      "bp.function",
      "bp.item",
      "bp.loot_table",
      "bp.structure",
      "bp.trading",
      "rp.animation_controller",
      "rp.animation",
      "rp.attachable",
      "rp.block",
      "rp.entity",
      "rp.fog",
      "rp.material",
      "rp.model",
      "rp.particle",
      "rp.render_controller",
      "rp.sound",
      "rp.texture",
    ];

    ids.forEach((id) => it("find id: " + id, () => expect(data.find((item) => item.id === id) !== undefined)));
  });
});
