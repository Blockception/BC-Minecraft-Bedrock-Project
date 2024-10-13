import { Process } from "../../../../src/Lib/Project/BehaviorPack/LootTable/Process";

describe("LootTable", () => {
  const files = [
    "F:\\Temp2\\world\\behavior_packs\\EW-BP\\loot_tables\\blocks\\example.json",
    "F:/Temp2/world/behavior_packs/EW-BP/loot_tables/blocks/example.json",
    "F:/Temp2/world/behavior_packs/EW-BP/loot_tables/blocks example.json"
  ]

  test.each(files)("process $s", (uri) => {
    const data = Process({ uri: uri, getText: () => "//example" });

    expect(data).toMatchSnapshot();
  });
});
