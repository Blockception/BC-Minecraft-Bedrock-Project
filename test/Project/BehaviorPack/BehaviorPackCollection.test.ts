import { Location } from "bc-minecraft-bedrock-types/lib/src/types";
import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { BehaviorPackCollection } from "../../../src/Lib/Project/BehaviorPack";

describe("BehaviorPackCollection", () => {
  it("sanity check", () => {
    const pc = new BehaviorPackCollection();
    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(0);

    pc.add("c:\\project\\", MCProject.createEmpty());

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(1);

    expect(pc.delete("c:\\project\\")).to.be.true;

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(0);
  });

  it("count", () => {
    const P = new BehaviorPackCollection();

    expect(P.count()).to.equal(0);

    P.add("c:/project/bp", MCProject.createEmpty());

    expect(P.count()).to.equal(1);

    P.add("c:/project2/bp", MCProject.createEmpty());
    expect(P.count()).to.equal(2);
  });

  it("add", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:/project/bp", MCProject.createEmpty());

    expect(pack.folder).to.equal("c:/project/bp");
    expect(P.count()).to.equal(1);

    P.add("c:/project2/bp", MCProject.createEmpty());
    expect(P.count()).to.equal(2);
  });

  it("add duplicate", () => {
    const P = new BehaviorPackCollection();

    expect(P.count()).to.equal(0);

    P.add("c:/project/bp", MCProject.createEmpty());
    P.add("c:/project/bp", MCProject.createEmpty());

    expect(P.count()).to.equal(2);
  });

  it("get", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty());

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";
    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    const item = P.get(uri);
    expect(item).to.not.be.undefined;
  });

  it("Remove File", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty());

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    expect(P.packs).to.not.undefined;
    expect(P.loot_tables.has("empty.loot.json")).to.be.true;

    expect(P.deleteFile(uri), "Expected operation to be successfull").to.be.true;

    expect(P.packs).to.not.undefined;
    expect(P.loot_tables.has("empty.loot.json")).to.be.false;
  });

  it("Remove Folder", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty());

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    expect(P.loot_tables.has("empty.loot.json")).to.be.true;

    expect(P.deleteFolder("c:\\temp\\bp\\loot_tables"), "Expected operation to be successfull").to.be.true;

    expect(P.loot_tables.has("empty.loot.json")).to.be.false;
  });

  it("Remove Folder - Entire Pack", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty());

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    expect(P.loot_tables.has("empty.loot.json")).to.be.true;

    expect(P.deleteFolder("c:\\temp\\bp"), "Expected operation to be successfull").to.be.true;

    expect(P.loot_tables.has("empty.loot.json")).to.be.false;
    expect(P.count()).to.be.equal(0);
  });
});
