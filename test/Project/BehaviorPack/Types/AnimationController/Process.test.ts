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

    it("Process", () => {
      const controllers = BehaviorPack.AnimationController.Process({ getText: () => data, uri: "example" });

      expect(controllers).to.not.be.undefined;

      if (!controllers) return;

      expect(controllers.length).to.equal(1);
    });
  });
});
