import { expect } from "chai";
import { Molang } from "./Molang";
import { VanillaPlayer } from "../../../test/Player.test";

describe("molang", () => {
  describe("geometries", () => {
    it("using", () => {
      let receiver: string[] = [];

      Molang.Geometries.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["humanoid.custom", "cape"]);
    });
  });
});
