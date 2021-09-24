import { expect } from "chai";
import { Json } from "../../../src/Lib/Internal/Json";
import { Internal } from "../../../src/main";

describe("RP Entity", () => {
  it("is", () => {
    const data = `{
      "format_version": "1.17.0",
      "minecraft:client_entity": {
        "description": {
          "identifier": "foo:example",
          "min_engine_version": "1.8.0",
          "materials": { "default": "entity", "alpha": "entity_alphatest" },
          "textures": { "default": "textures/entity/example/example" },
          "render_controllers": ["controller.render.default"],
          "geometry": { "default": "geometry.example" },
          "animations": {
            "default_pose": "animation.example.default_pose",
            "controller.pose": "controller.animation.example.pose"
          },
          "scripts": {
            "initialize": ["variable.example.a = 0;", "variable.example.b = 0;"],
            "animate": ["controller.pose"]
          }
        }
      }
    }`;

    const obj = Json.To<Internal.ResourcePack.Entity>(data);

    expect(obj).to.not.be.undefined;

    if (!obj) return;

    expect(obj.format_version).to.not.be.undefined;
    expect(obj["minecraft:client_entity"]).to.not.be.undefined;
    expect(obj["minecraft:client_entity"].description).to.not.be.undefined;

    expect(Internal.ResourcePack.Entity.is(obj)).to.be.true;
  });
});
