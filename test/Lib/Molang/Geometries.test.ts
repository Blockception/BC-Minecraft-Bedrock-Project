import { expect } from "chai";
import { Molang } from "../../../src/Lib/Molang/Molang";
import { VanillaPlayer } from "../../Utillity/Player";

describe("molang", () => {
  describe("geometries", () => {
    it("using", () => {
      let receiver: string[] = [];

      Molang.Geometries.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["humanoid.custom", "cape"]);
    });
  });
});
