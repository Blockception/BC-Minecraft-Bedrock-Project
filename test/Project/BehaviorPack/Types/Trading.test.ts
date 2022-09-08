import { expect } from "chai";
import { Process } from "../../../../src/Lib/Project/BehaviorPack/Trading/Process";

describe("Trading", () => {
  it("Process 1", () => {
    const uri = "F:\\Temp2\\world\\behavior_packs\\EW-BP\\trading\\blocks\\example.json";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("trading/blocks/example.json");
  });

  it("Process 2", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks/example.json";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("trading/blocks/example.json");
  });

  it("Process 3", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks example.json";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("trading/blocks example.json");
  });
});
