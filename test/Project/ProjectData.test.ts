import { Location } from "bc-minecraft-bedrock-types/lib/src/Types/Location";
import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { BehaviorPack } from "../../src/Lib/Project/BehaviorPack/include";
import { ResourcePack } from "../../src/Lib/Project/ResourcePack/ResourcePack";
import { ProjectData } from "../../src/main";

describe("ProjectData", () => {
  it("Sanity Check", () => {
    const P = new ProjectData();

    expect(P).to.not.be.undefined;
    expect(P.BehaviorPacks).to.not.be.undefined;
    expect(P.General).to.not.be.undefined;
    expect(P.ResourcePacks).to.not.be.undefined;

    expect(P.BehaviorPacks.packs).to.not.be.undefined;
    expect(P.ResourcePacks.packs).to.not.be.undefined;

    expect(P.General.fakeEntities).to.not.be.undefined;
    expect(P.General.objectives).to.not.be.undefined;
    expect(P.General.tags).to.not.be.undefined;
    expect(P.General.tickingAreas).to.not.be.undefined;
  });

  describe("Behaviourpack", () => {
    it("add", () => {
      const P = new ProjectData();
      const pack = P.BehaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty());

      expect(P.BehaviorPacks.count()).to.equal(1);
    });

    it("get", () => {
      const P = new ProjectData();
      const pack = P.BehaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty());
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      const data = P.get(uri);

      if (!data) {
        expect.fail("expacted a pack");
      } else {
        if (BehaviorPack.is(data)) {
          expect(data.loot_tables.has("empty.loot.json")).to.be.true;
        } else {
          expect.fail("expacted a bp pack");
        }
      }
    });

    it("Remove File", () => {
      const P = new ProjectData();
      const pack = P.BehaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty());

      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.BehaviorPacks.packs).to.not.undefined;
      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.true;

      expect(P.deleteFile(uri), "Expected operation to be successfull").to.be.true;

      expect(P.BehaviorPacks.packs).to.not.undefined;
      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.false;
    });

    it("Remove Folder", () => {
      const P = new ProjectData();
      const pack = P.BehaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty());

      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.true;

      expect(P.deleteFolder("c:\\temp\\bp\\loot_tables"), "Expected operation to be successfull").to.be.true;

      expect(P.BehaviorPacks.loot_tables.has("empty.loot.json")).to.be.false;
    });

    it("Remove Folder - Entire Pack", () => {
      const P = new ProjectData();
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
    it("add", () => {
      const P = new ProjectData();
      const pack = P.ResourcePacks.add("c:\\temp\\rp", MCProject.createEmpty());

      expect(P.ResourcePacks.count()).to.equal(1);
    });

    it("get", () => {
      const P = new ProjectData();
      const pack = P.ResourcePacks.add("c:\\temp\\rp", MCProject.createEmpty());
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
      const P = new ProjectData();
      const pack = P.ResourcePacks.add("c:\\temp\\rp", MCProject.createEmpty());

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
      const P = new ProjectData();
      const pack = P.ResourcePacks.add("c:\\temp\\rp", MCProject.createEmpty());
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
      const P = new ProjectData();
      const pack = P.ResourcePacks.add("c:\\temp\\rp", MCProject.createEmpty());

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
    it("Remove File", () => {
      const P = new ProjectData();
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "init";

      P.General.tags.set({ id: id, location: Location.create(uri) });

      expect(P.General.tags.has(id)).to.be.true;

      expect(P.deleteFile(uri), "Expected operation to be successfull").to.be.true;

      expect(P.General.tags.has(id)).to.be.false;
    });
  });
});
