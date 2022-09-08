import { expect } from "chai";
import { BehaviorPack } from "../../../../../src/main";

describe("BehaviorPack", () => {
  describe("Animation Controller", () => {
    const data = `{
      "format_version": "1.8.0",
      "animation_controllers": {
        "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": 0 }] } } }
      }
    }`;

    describe("Process", () => {
      const controllers = BehaviorPack.Types.AnimationController.Process({
        getText: () => data,
        uri: "example",
      });

      it("Not Undefined", () => {
        expect(controllers).to.not.be.undefined;
      });

      if (!controllers) return;

      it("Has controller", ()=>{
        expect(controllers.length).to.equal(1);
      })
    });
  });
});
