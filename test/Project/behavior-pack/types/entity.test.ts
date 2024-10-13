import { Json } from "../../../../src/Lib/Internal/Json";
import { TextDocument } from "../../../../src/Lib/Types/TextDocument";
import * as Internal from "../../../../src/Lib/Internal/BehaviorPack/Entity";
import { Entity } from "../../../../src/Lib/Project/BehaviorPack";

const EntityJson: string = `{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "blockception:sheep",
      "is_spawnable": true,
      "is_summonable": true,
      "animations": {
        "controller": "controller.animation.chicken",
        "something": "controller.i.dont.exist"
      },
      "scripts": {
        "animate": ["controller"]
      }
    },
    "component_groups": {
      "self:group1": {
        "minecraft:type_family": {
          "family": ["animal"]
        }
      }
    },
    "components": {
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:type_family": {
        "family": ["mob"]
      }
    },
    "events": {
      "self:to": {}
    }
  }
}`;

const EntityDoc: TextDocument = {
  uri: "C:\\temp.json",
  getText: () => EntityJson,
};

describe("Entity", () => {
  describe("Data", () => {
    const imp = Json.To<Internal.Entity>(EntityJson);

    it("Not Undefined", () => {
      expect(imp).toBeDefined();
    });

    it("Is entity", () => {
      expect(Internal.Entity.is(imp)).toBeTruthy();
    });
  });

  test("Families", () => {
    const data = Entity.Process(EntityDoc);

    expect(data).toMatchSnapshot();
  });
});
