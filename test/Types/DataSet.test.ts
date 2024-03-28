import { Types } from "bc-minecraft-bedrock-types";
import { Location } from "bc-minecraft-bedrock-types/lib/src/types";
import { expect } from "chai";
import { DataSet } from "../../src/Lib/Types/DataSet";

interface TestObject extends Types.BaseObject {}

namespace TestObject {
  export function create(
    id: string,
    uri: string,
    position: Types.DocumentLocation | undefined = undefined
  ): TestObject {
    return {
      id: id,
      location: Location.create(uri, position),
      documentation: "custom object: " + id,
    };
  }
}

const dataID = "example.id";
const dataUri = "c:\\project\\bp\\loot_tables\\example.data.json";
const dataFolder = "c:\\project\\bp\\loot_tables";
const dataItem = TestObject.create(dataID, dataUri);

describe("DataSet", () => {
  it("set", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataID)).to.be.true;
    expect(set.count()).to.equal(1);
  });

  it("get", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    const d = set.get(dataID);

    expect(d).to.be.equal(dataItem);
  });

  it("get duplicate", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);
    set.set(TestObject.create(dataID, "I am different", 0));

    const d = set.get(dataID);

    expect(d).to.not.equal(dataItem);
    expect(d?.id).to.equal(dataItem.id);
  });

  it("has", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataID)).to.be.true;
  });

  it("duplicate sets", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;

    expect(set.count()).to.be.equal(1);

    //duplicate sets
    set.set(dataItem);
    set.set(dataItem);
    set.set(dataItem);

    expect(set.count()).to.be.equal(1);
  });

  it("clear", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;

    set.clear();

    expect(set.count()).to.be.equal(0);
    expect(set.has(dataID)).to.be.false;
  });

  it("count", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;

    expect(set.count()).to.be.equal(1);

    //duplicate sets
    set.set(TestObject.create("a", "b"));
    set.set(TestObject.create("c", "b"));
    set.set(TestObject.create("d", "b"));

    expect(set.count()).to.be.equal(4);
  });

  it("delete1", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;
    expect(set.delete(dataItem)).to.be.true;
    expect(set.has(dataItem)).to.be.false;
  });

  it("delete2", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;
    expect(set.delete(dataID)).to.be.true;
    expect(set.has(dataItem)).to.be.false;
  });

  it("deleteFile", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;
    expect(set.deleteFile(dataUri)).to.be.true;
    expect(set.has(dataItem)).to.be.false;
  });

  it("deleteFolder", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).to.be.true;
    expect(set.deleteFolder(dataFolder)).to.be.true;
    expect(set.has(dataItem)).to.be.false;
  });

  it("foreach", () => {
    const set = new DataSet<TestObject>();

    set.set(TestObject.create("a", "b"));
    set.set(TestObject.create("c", "b"));
    set.set(TestObject.create("d", "b"));
    set.set(TestObject.create("e", "b"));

    let count = 0;

    set.forEach((p) => {
      if (p) count++;
      else expect.fail("Item was undefined");
    });

    expect(count).to.equal(4);
  });
});
