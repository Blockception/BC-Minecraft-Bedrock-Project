import { Process } from "../../../../src/Lib/Project/BehaviorPack/Trading/Process";

describe("Trading", () => {
  const files = [
    "F:\\Temp2\\world\\behavior_packs\\EW-BP\\trading\\blocks\\example.json",
    "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks/example.json",
    "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks example.json",
  ];

  test.each(files)("process: $s", (uri) => {
    const out = Process({ uri: uri, getText: () => "//example" });
    expect(out).toMatchSnapshot();
  });
});