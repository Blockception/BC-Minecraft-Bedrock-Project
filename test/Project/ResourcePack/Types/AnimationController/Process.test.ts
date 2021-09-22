import { expect } from "chai";
import { ResourcePack } from "../../../../../src/main";

describe("Resourcepack", () => {
  describe("Animation Controller", () => {
    const data = `{
      "format_version": "1.8.0",
      "animation_controllers": {
        "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": [] }] } } }
      }
    }`;

    it("Process", () => {
      const controllers = ResourcePack.AnimationController.Process({ getText: () => data, uri: "example" });

      expect(controllers).to.not.be.undefined;

      if (!controllers) return;

      expect(controllers.length).to.equal(1);
    });
  });
});
