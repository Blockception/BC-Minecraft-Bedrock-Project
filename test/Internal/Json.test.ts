import { expect } from "chai";
import { Json } from "../../src/Lib/Internal/Json";

describe("Json", () => {
  describe("To", () => {
    const data = `{"id":"controller.example","documentation":"example"}`;
    const obj = Json.To<TestInterface>(data);

    it("not undefined", () => {
      expect(obj).to.not.be.undefined;
    });

    if (!obj) return;

    it("Validation", () => {
      expect(obj.documentation).to.equal("example");
      expect(obj.id).to.equal("controller.example");
    });
  });

  describe("To Doc", () => {
    const data = `{"id":"controller.example","documentation":"example"}`;
    const obj = Json.To<TestInterface>({ getText: () => data, uri: "example" });

    it("not undefined", () => {
      expect(obj).to.not.be.undefined;
    });

    if (!obj) return;

    it("Validation", () => {
      expect(obj.documentation).to.equal("example");
      expect(obj.id).to.equal("controller.example");
    });
  });
});

interface TestInterface {
  id: string;
  documentation: string;
}
