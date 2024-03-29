import { expect } from "chai";
import { Documentation } from "../../src/Lib/Types/Documentation";
import { TextDocument } from "../../src/Lib/Types/TextDocument";

describe("Documentation", () => {
  describe("Json", () => {
    const exampleDoc: TextDocument = {
      uri: "c:\\exampe.json",
      getText: () => `//I am the firstline comment
      {
        //I am the second comment
        "property": "some value" //I am the thrid comment
      }`,
    };
    const example2Doc: TextDocument = {
      uri: "c:\\exampe.json",
      getText: () => `//I am the firstline comment
      {
        //I am the second comment
        "property": "some value"
      }`,
    };

    it("First Line", () => {
      expect(Documentation.getDoc(exampleDoc)).to.equal("I am the firstline comment");
    });

    it("Second Line", () => {
      const index = example2Doc.getText().indexOf("property");
      expect(Documentation.getDoc(example2Doc, undefined, index)).to.equal("I am the second comment");
    });

    it("Thrid Line", () => {
      const index = exampleDoc.getText().indexOf("property");
      expect(Documentation.getDoc(exampleDoc, undefined, index)).to.equal("I am the thrid comment");
    });
  });

  describe("Mcfunction", () => {
    const exampleDoc: TextDocument = {
      uri: "c:\\exampe.mcfunction",
      getText: () => `## I am the firstline comment
##I am the second comment
scoreboard players set global id 0 ##I am the thrid comment`,
    };
    const example2Doc: TextDocument = {
      uri: "c:\\exampe.mcfunction",
      getText: () => `## I am the firstline comment
##I am the second comment
scoreboard players set global id 0`,
    };

    it("First Line", () => {
      expect(Documentation.getDoc(exampleDoc)).to.equal("I am the firstline comment");
    });

    it("Second Line", () => {
      const index = example2Doc.getText().indexOf("scoreboard");
      expect(Documentation.getDoc(example2Doc, undefined, index)).to.equal("I am the second comment");
    });

    it("Thrid Line", () => {
      const index = exampleDoc.getText().indexOf("scoreboard");
      expect(Documentation.getDoc(exampleDoc, undefined, index)).to.equal("I am the thrid comment");
    });
  });
});
