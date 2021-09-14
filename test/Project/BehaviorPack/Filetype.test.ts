import { expect } from "chai";
import path from "path";
import { BehaviorPack } from "../../../src/main";

describe("BP Filetype", () => {
  describe("Detect", () => {
    const DetectTests = [
      ["F:\\Example-bp\\animations\\sheep.run.animation.json", BehaviorPack.FileType.animation],
      ["F:\\Example-bp\\animation_controllers\\sheep.walk.controller.json", BehaviorPack.FileType.animation_controller],
      ["F:\\Example-bp\\blocks\\master.block.json", BehaviorPack.FileType.block],
      ["F:\\Example-bp\\entities\\dragon.entity.json", BehaviorPack.FileType.entity],
      ["F:\\Example-bp\\functions\\action.mcfunction", BehaviorPack.FileType.function],
      ["F:\\Example-bp\\items\\master_block.item.json", BehaviorPack.FileType.item],
      ["F:\\Example-bp\\loot_tables\\master_blockloot.json", BehaviorPack.FileType.loot_table],
      ["F:\\Example-bp\\manifest.json", BehaviorPack.FileType.manifest],
      ["F:\\Example-bp\\spawn_rules\\pig.json", BehaviorPack.FileType.spawn_rule],
      ["F:\\Example-bp\\structures\\build\\data.mcstructure", BehaviorPack.FileType.structure],
      ["F:\\Example-bp\\trading\\master_block.trades.json", BehaviorPack.FileType.trading],

      ["F:\\Example\\animations\\sheep.run.animation.json", BehaviorPack.FileType.animation],
      ["F:\\Example\\animation_controllers\\sheep.walk.controller.json", BehaviorPack.FileType.animation_controller],
      ["F:\\Example\\blocks\\master.block.json", BehaviorPack.FileType.block],
      ["F:\\Example\\entities\\dragon.entity.json", BehaviorPack.FileType.entity],
      ["F:\\Example\\functions\\action.mcfunction", BehaviorPack.FileType.function],
      ["F:\\Example\\items\\master_block.item.json", BehaviorPack.FileType.item],
      ["F:\\Example\\loot_tables\\master_blockloot.json", BehaviorPack.FileType.loot_table],
      ["F:\\Example\\manifest.json", BehaviorPack.FileType.manifest],
      ["F:\\Example\\spawn_rules\\pig.json", BehaviorPack.FileType.spawn_rule],
      ["F:\\Example\\structures\\build\\data.mcstructure", BehaviorPack.FileType.structure],
      ["F:\\Example\\trading\\master_block.trades.json", BehaviorPack.FileType.trading],
    ];

    DetectTests.forEach((item) => {
      it(<string>item[0], () => {
        let filepath = <string>item[0];
        const expected = <BehaviorPack.FileType>item[1];

        if (path.sep !== "\\") filepath = filepath.replace(/\\/gi, "/");

        const test = BehaviorPack.FileType.detect(path.normalize(filepath));

        expect(test).to.equal(expected, `${BehaviorPack.FileType[test]} was not ${BehaviorPack.FileType[expected]}`);
      });
    });
  });
});
