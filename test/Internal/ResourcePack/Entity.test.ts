import { expect } from "chai";
import { Json } from "../../../src/Lib/Internal/Json";
import { Internal } from "../../../src/main";

describe("RP Entity", () => {
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

  describe("correct", () => {
    const obj = Json.To<Internal.ResourcePack.Entity>(data);

    it("not undefined", () => {
      expect(obj).to.not.be.undefined;
    });

    if (!obj) return;

    it("Is entity", () => {
      expect(Internal.ResourcePack.Entity.is(obj)).to.be.true;
    });

    it("format version is string", () => {
      expect(obj.format_version).a("string");
    });

    describe("minecraft:client_entity", () => {
      const client = obj["minecraft:client_entity"];

      it("not undefined", () => {
        expect(client).to.not.be.undefined;
      });

      it("has decription", () => {
        expect(client.description).to.be.not.undefined;
      });
    });
  });
});
