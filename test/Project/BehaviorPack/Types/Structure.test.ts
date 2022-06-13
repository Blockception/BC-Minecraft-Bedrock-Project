import { expect } from "chai";
import { Process } from "../../../../src/Lib/Project/BehaviorPack/Types/Structure/Process";

describe("Structure", () => {
  const data: { uri: string; result: string }[] = [
    {
      uri: "F:\\Temp2\\world\\behavior_packs\\EW-BP\\structures\\empty\\air_1.mcstructure",
      result:'"empty/air_1"',
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/structures/empty/air_1.mcstructure",
      result: '"empty/air_1"',
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/structures/empty/temp/air_1.mcstructure",
      result: '"empty/temp/air_1"',
    },
  ];

  data.forEach(item=>{
    describe(`${item.result} from ${item.uri}`, ()=>{
      const out = Process({ uri: item.uri, getText: (range) => "//example" });

      it("not undefined", ()=>{
        expect(out).to.not.be.undefined;
      })

      if (!out) return;

      it("has id", ()=>{
        expect(out.id).to.equal(item.result);
      })
    })
  })
});
