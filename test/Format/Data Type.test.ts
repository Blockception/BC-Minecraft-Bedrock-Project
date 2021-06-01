import { expect } from "chai";
import { DataType } from "../../src/Lib/Format/Data Type";
import { Detect } from "../../src/Lib/Format/Detection";
import { GeneralDataType } from "../../src/Lib/Format/General Data Type";

const GeneralPaths: { type: GeneralDataType; path: string }[] = [
  {
    type: GeneralDataType.resource_pack,
    path: "C:/Users/user/AppData/Local/Packages/Microsoft.MinecraftUWP_/LocalState/games/com.mojang/minecraftWorlds/bBm2YKv8JQA=/resource_packs/test/manifest.json",
  },
  {
    type: GeneralDataType.behavior_pack,
    path: "C:/Users/user/AppData/Local/Packages/Microsoft.MinecraftUWP_/LocalState/games/com.mojang/minecraftWorlds/bBm2YKv8JQA=/behavior_packs/test/manifest.json",
  },
];

const DataTypePaths: { type: DataType; path: string }[] = [
  { type: DataType.behavior_animation_controller, path: "C:/foo-BP/animation_controllers/foo.json" },
  { type: DataType.behavior_animation, path: "C:/foo-BP/animations/foo.json" },
  { type: DataType.behavior_block, path: "C:/foo-BP/blocks/bar.json" },
  { type: DataType.behavior_entity, path: "C:/foo-BP/entities/Dragon.json" },
  { type: DataType.behavior_function, path: "C:/foo-BP/functions/init/something.mcfunction" },
  { type: DataType.behavior_item, path: "C:/foo-BP/items/something.json" },
  { type: DataType.behavior_loot_table, path: "C:/foo-BP/loot_tables/something.json" },
  { type: DataType.behavior_manifest, path: "C:/foo-BP/manifest.json" },
  { type: DataType.behavior_script, path: "C:/foo-BP/scripts/something.js" },
  { type: DataType.behavior_spawn_rules, path: "C:/foo-BP/spawn_rules/foo.json" },
  { type: DataType.behavior_trade, path: "C:/foo-BP/trading/foo.json" },

  { type: DataType.resource_animation_controller, path: "C:/foo-RP/animation_controllers/foo.json" },
  { type: DataType.resource_animation, path: "C:/foo-RP/animations/foo.json" },
];

describe("Format", () => {
  describe("Detect", () => {
    it("General BP", () => {
      testGeneral("C:/behavior_packs/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/behaviour_packs/test/manifest.json", GeneralDataType.behavior_pack);

      testGeneral("C:/BP/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/bp/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/Bp/test/manifest.json", GeneralDataType.behavior_pack);

      testGeneral("C:/BehaviourPack/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/Behaviour Pack/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/Behaviour_Pack/test/manifest.json", GeneralDataType.behavior_pack);

      testGeneral("C:/BehaviorPack/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/Behavior Pack/test/manifest.json", GeneralDataType.behavior_pack);
      testGeneral("C:/Behavior_Pack/test/manifest.json", GeneralDataType.behavior_pack);
    });

    it("General RP", () => {
      testGeneral("C:/resource_pack/test/manifest.json", GeneralDataType.resource_pack);

      testGeneral("C:/RP/test/manifest.json", GeneralDataType.resource_pack);
      testGeneral("C:/rp/test/manifest.json", GeneralDataType.resource_pack);
      testGeneral("C:/Rp/test/manifest.json", GeneralDataType.resource_pack);

      testGeneral("C:/ResourcePack/test/manifest.json", GeneralDataType.resource_pack);
      testGeneral("C:/Resource Pack/test/manifest.json", GeneralDataType.resource_pack);
      testGeneral("C:/Resource_Pack/test/manifest.json", GeneralDataType.resource_pack);
    });

    it("Date Types Tests", () => {
      DataTypePaths.forEach((test) => {
        const type = Detect.DataType(test.path);
        expect(type).to.equal(test.type, `${test.path} was not ${test.type}`);
      });
    });

    it("General Types Tests", () => {
      GeneralPaths.forEach((test) => {
        const type = Detect.GeneralDataType(test.path);
        expect(type).to.equal(test.type, `${test.path} was not ${test.type}`);
      });
    });
  });
});

function testGeneral(filepath: string, ex: GeneralDataType): void {
  expect(Detect.GeneralDataType(filepath)).to.equal(ex, `${filepath} was not ${ex}`);
}
