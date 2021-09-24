import { Types } from 'bc-minecraft-bedrock-types';
import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { PackCollection } from "../../src/Lib/Types/Pack/PackCollection";
import { Pack, TextDocument } from "../../src/main";

const defaultFolder = "c:\\project\\bp";
const defaultContext = MCProject.createEmpty();

class TestPack implements Pack {
  folder: string;
  context: MCProject;
  docs: TextDocument[];
  docFilter: RegExp | undefined;

  constructor(docFilter: RegExp | undefined = undefined, folder: string | undefined = undefined, context: MCProject | undefined = undefined) {
    this.folder = folder ?? defaultFolder;
    this.context = context ?? defaultContext;

    this.docFilter = docFilter;
    this.docs = [];
  }

  process(doc: TextDocument) {
    if (this.docFilter?.test(doc.uri) ?? true) this.docs.push(doc);

    return undefined;
  }

  deleteFile(uri: string): boolean {
    const old = this.docs.length;
    this.docs = this.docs.filter((d) => d.uri !== uri);

    return this.docs.length !== old;
  }

  deleteFolder(uri: string): boolean {
    const old = this.docs.length;
    this.docs = this.docs.filter((d) => !d.uri.startsWith(uri));

    return this.docs.length !== old;
  }

  
  /**
   * 
   * @param predicate 
   * @returns 
   */
   find(predicate: (value: Types.Identifiable & Types.Documentated & Types.Locatable, key: string) => boolean): (Types.Identifiable & Types.Documentated & Types.Locatable) | undefined {
    let value = undefined;


    return value;
  }
}

class TestPackCollection extends PackCollection<TestPack> {
  constructor() {
    super();
  }
}

namespace TestPackCollection {
  /**
   *
   * @param docFilter
   * @param folder
   * @param context
   * @returns
   */
  export function defaultCollection(
    docFilter: RegExp | undefined = undefined,
    folder: string | undefined = undefined,
    context: MCProject | undefined = undefined
  ): TestPackCollection {
    const pc = new TestPackCollection();
    pc.packs.push(new TestPack(docFilter, folder, context));

    return pc;
  }
}

describe("PackCollectionTest", () => {
  it("sanity check", () => {
    const pc = new TestPackCollection();

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(0);

    pc.packs.push(new TestPack(undefined, "c:\\project\\"));

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(1);

    expect(pc.delete("c:\\project\\")).to.be.true;

    expect(pc.packs).to.not.be.undefined;
    expect(pc.packs.length).to.be.equal(0);
  });

  it("count", () => {
    const pc = new TestPackCollection();

    expect(pc.count()).to.be.equal(0);

    pc.packs.push(new TestPack(undefined, "c:\\project\\"));

    expect(pc.count()).to.be.equal(1);
  });

  it("delete1", () => {
    const pc = new TestPackCollection();

    pc.packs.push(new TestPack(undefined, "c:\\project\\"));
    expect(pc.count()).to.be.equal(1);

    pc.delete("c:\\project\\");
    expect(pc.count()).to.be.equal(0);
  });

  it("delete2", () => {
    const pc = new TestPackCollection();

    pc.packs.push(new TestPack(undefined, "c:\\project\\"));
    expect(pc.count()).to.be.equal(1);

    pc.deleteFolder("c:\\project\\");
    expect(pc.count()).to.be.equal(0);
  });

  it("process", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = { uri: "c:\\project2\\loot\\example.json", getText: () => "" };

    expect(pack1.docs.length).to.equal(0);
    expect(pack2.docs.length).to.equal(0);

    pc.process(doc);

    expect(pack1.docs.length).to.equal(0);
    expect(pack2.docs.length).to.equal(1);
  });

  it("get", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = { uri: "c:\\project2\\bp\\loot\\example.json", getText: () => "" };

    expect(doc.uri.startsWith(pack2.folder)).to.true;

    const p = pc.get(doc);

    if (!p) {
      expect.fail("returned no pack");
    } else {
      expect(p.folder).to.equal(pack2.folder);
    }
  });

  it("get2", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = { uri: "c:\\project2\\loot\\example.json", getText: () => "" };

    expect(doc.uri.startsWith(pack2.folder)).to.true;

    let p = undefined;
    const packs = pc.packs;

    for (let I = 0; I < pc.packs.length; I++) {
      if (doc.uri.startsWith(pc.packs[I].folder)) {
        p = pc.packs[I];
        break;
      }
    }

    if (!p) {
      expect.fail("returned no pack");
    } else {
      expect(p.folder).to.equal(pack2.folder);
    }
  });

  it("deleteFile", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = { uri: "c:\\project2\\loot\\example.json", getText: () => "" };

    pc.process(doc);
    expect(pack2.docs.length).to.equal(1);
    expect(pack1.docs.length).to.equal(0);

    expect(pc.deleteFile(doc.uri)).to.be.true;

    expect(pack2.docs.length).to.equal(0);
    expect(pack1.docs.length).to.equal(0);
  });

  it("deleteFolder", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = { uri: "c:\\project2\\loot\\example.json", getText: () => "" };

    pc.process(doc);
    expect(pack2.docs.length).to.equal(1);
    expect(pack1.docs.length).to.equal(0);

    expect(pc.deleteFolder("c:\\project2\\loot")).to.be.true;

    expect(pack2.docs.length).to.equal(0);
    expect(pack1.docs.length).to.equal(0);
  });

  it("deleteFolder", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = { uri: "c:\\project2\\loot\\example.json", getText: () => "" };

    pc.process(doc);
    expect(pack2.docs.length).to.equal(1);
    expect(pack1.docs.length).to.equal(0);
    expect(pc.count()).to.equal(2);

    expect(pc.deleteFolder("c:\\project2\\")).to.be.true;

    expect(pack2.docs.length).to.equal(1);
    expect(pack1.docs.length).to.equal(0);
    expect(pc.count()).to.equal(1);
  });
});
