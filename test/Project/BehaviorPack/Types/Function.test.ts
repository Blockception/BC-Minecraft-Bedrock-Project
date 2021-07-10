import { expect } from "chai";
import { Process } from "../../../../src/Lib/Project/BehaviorPack/Types/Function/Process";

describe("Function", () => {
  it("Process 1", () => {
    const uri = "F:\\Temp2\\world\\behavior_packs\\EW-BP\\functions\\empty\\air_1.mcfunction";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("empty/air_1");
  });

  it("Process 2", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/functions/empty/air_1.mcfunction";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("empty/air_1");
  });

  it("Process 3", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/functions/empty/temp/air_1.mcfunction";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal("empty/temp/air_1");
  });

  it("Process 4", () => {
    const uri = "F:/Temp2/world/behavior_packs/EW-BP/functions/empty/temp build/air_1.mcfunction";

    const out = Process({ uri: uri, getText: (range) => "//example" });

    if (!out) expect.fail();

    expect(out.id).to.equal('"empty/temp build/air_1"');
  });
});
