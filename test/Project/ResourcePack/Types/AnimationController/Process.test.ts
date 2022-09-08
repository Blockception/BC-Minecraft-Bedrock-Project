import { expect } from "chai";
import { ResourcePack } from '../../../../../src/Lib/Project';

describe("Resourcepack", () => {
  describe("Animation Controller", () => {
    const data = `{
      "format_version": "1.8.0",
      "animation_controllers": {
        "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": [] }] } } }
      }
    }`;

    describe("Process", () => {
      const controllers = ResourcePack.AnimationController.Process({ getText: () => data, uri: "example" });

      it("not undefined", () => {
      expect(controllers).to.not.be.undefined;
      })

      if (!controllers) return;

      it("has specific length", ()=>{
        expect(controllers.length).to.equal(1);
      })
    });
  });
});
