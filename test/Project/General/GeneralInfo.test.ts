import { expect } from "chai";
import { GeneralInfo } from "../../../src/Lib/Project/General/Types/GeneralInfo";

describe("GeneralInfo", () => {
  it("create", () => {
    let test = GeneralInfo.create('"example"', { position: 0, uri: "example" }, "A fake entity");

    expect(test.id).to.equal("example");

    test = GeneralInfo.create("example", { position: 0, uri: "example" }, "A fake entity");

    expect(test.id).to.equal("example");
  });
});
