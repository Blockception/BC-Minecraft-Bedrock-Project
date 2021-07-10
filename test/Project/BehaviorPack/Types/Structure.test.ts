import { expect } from "chai";
import { Process } from "../../../../src/Lib/Project/BehaviorPack/Types/Structure/Process";

describe("Structure", () => {
  it("Process 1", () => {
    const uri = "F:\\Temp2\\world\\behavior_packs\\EW-BP\\structures\\empty\\air_1.mcstructure";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("empty:air_1");
  });

  it("Process 2", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/structures/empty/air_1.mcstructure";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("empty:air_1");
  });

  it("Process 3", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/structures/empty/temp/air_1.mcstructure";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("empty:temp/air_1");
  });
});
