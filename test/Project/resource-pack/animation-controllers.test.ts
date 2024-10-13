import { ResourcePack } from "../../../src/Lib/Project";

describe("Resourcepack - Animation Controller", () => {
  const data = `{
    "format_version": "1.8.0",
    "animation_controllers": {
      "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": [] }] } } }
    }
  }`;

  test("Process", () => {
    const controllers = ResourcePack.AnimationController.Process({ getText: () => data, uri: "example" });
    expect(controllers).toMatchSnapshot();
  });
});
