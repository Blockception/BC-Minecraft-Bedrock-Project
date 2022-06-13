import { expect } from "chai";
import { Json } from "../../../src/Lib/Internal/Json";
import { Internal } from "../../../src/main";

describe("BP Animation", () => {
  const correct_animations: string[] = [
    "{}",
    `{
      "animation_length": 3.0,
      "loop": false,
      "timeline": {
        "0.0": ["/function example/something"]
      }
    }`,
  ];

  correct_animations.forEach((anim, index) => {
    describe("correct " + index, () => {
      const obj = Json.To<Internal.BehaviorPack.Animation>(anim);

      it("not undefined", () => {
        expect(obj).to.not.be.undefined;
      });

      if (!obj) return;

      it("is animation", () => {
        expect(Internal.BehaviorPack.Animation.is(obj)).to.be.true;
      });
    });
  });
});
