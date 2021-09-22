import { expect } from "chai";
import { Json } from "../../src/Lib/Internal/Json";

describe("Json", () => {
  it("To", () => {
    const data = `{"id":"controller.example","documentation":"example"}`;

    const obj = Json.To<TestInterface>(data);

    expect(obj).to.not.be.undefined;

    if (!obj) return;

    expect(obj.documentation).to.equal("example");
    expect(obj.id).to.equal("controller.example");
  });

  it("To Doc", () => {
    const data = `{"id":"controller.example","documentation":"example"}`;

    const obj = Json.To<TestInterface>({ getText: () => data, uri: "example" });

    expect(obj).to.not.be.undefined;

    if (!obj) return;

    expect(obj.documentation).to.equal("example");
    expect(obj.id).to.equal("controller.example");
  });
});

interface TestInterface {
  id: string;
  documentation: string;
}
