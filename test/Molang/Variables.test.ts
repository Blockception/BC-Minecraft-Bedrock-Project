import { expect } from "chai";
import { Molang } from "../../src/Lib/Molang/Molang";
import { VanillaPlayer } from "../Player.test";

describe("molang", () => {
  describe("variables", () => {
    it("defined1", () => {
      let receiver: string[] = [];

      Molang.Variables.getDefined("variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;", receiver);

      expect(receiver).to.have.members(["foo1", "foo2", "foo3"]);
    });

    it("duplicate check", () => {
      let receiver: string[] = [];

      Molang.Variables.getDefined(["variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;", "variable.foo3 = 0;"], receiver);

      expect(receiver).to.have.members(["foo1", "foo2", "foo3"]);
    });

    it("defined not sticky?", () => {
      expect(Molang.Variables.getDefinedPatt.sticky).to.equal(false);
    });

    it("using1", () => {
      let receiver: string[] = [];

      Molang.Variables.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["player_x_rotation", "attack_time", "is_first_person"]);
    });
  });
});
