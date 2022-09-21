import { expect } from "chai";
import { GeneralInfo } from "../../../src/Lib/Project/General/Types/GeneralInfo";

describe("GeneralInfo", () => {
  describe("Create", () => {
    it("With quotes", () => {
      const test = GeneralInfo.create('"example"', { position: 0, uri: "example" }, "A fake entity");

      expect(test.id).to.equal("example");
    });

    it("Without quotes", () => {
      const test = GeneralInfo.create("example", { position: 0, uri: "example" }, "A fake entity");

      expect(test.id).to.equal("example");
    });
  });
});
