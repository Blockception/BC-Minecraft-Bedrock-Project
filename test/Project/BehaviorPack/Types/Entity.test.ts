import { expect } from "chai";
import { Json } from "../../../../src/Lib/Internal/Json";
import { Entity } from "../../../../src/Lib/Project/BehaviorPack/include";
import { TextDocument } from "../../../../src/Lib/Types/include";
import * as internal from "../../../../src/Lib/Internal/BehaviorPack/Entity";

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

const EntityDoc: TextDocument = { uri: "C:\\temp.json", getText: (range) => EntityJson };

describe("Entity", () => {
  it("Data", () => {
    const imp = Json.To<internal.Entity>(EntityJson);

    expect(internal.Entity.is(imp)).to.be.true;
  });

  it("Families", () => {
    const data = Entity.Process(EntityDoc);

    expect(data).to.not.be.undefined;

    if (!data) return;
    expect(data.families).has.members(["animal", "mob"]);
    expect(data.families.length).to.equal(2);
  });

  it("Animations", () => {
    const data = Entity.Process(EntityDoc);

    expect(data).to.not.be.undefined;

    if (!data) return;
    expect(data.animations.using).has.members(["controller.animation.chicken", "controller.i.dont.exist"]);
    expect(data.animations.defined).has.members(["controller", "something"]);
  });

  it("Events", () => {
    const data = Entity.Process(EntityDoc);

    expect(data).to.not.be.undefined;

    if (!data) return;
    expect(data.events).has.members(["self:to"]);
  });

  it("Groups", () => {
    const data = Entity.Process(EntityDoc);

    expect(data).to.not.be.undefined;

    if (!data) return;
    expect(data.groups).has.members(["self:group1"]);
  });

  it("ID", () => {
    const data = Entity.Process(EntityDoc);

    expect(data).to.not.be.undefined;

    if (!data) return;
    expect(data.id).has.members(["blockception:sheep"]);
  });
});
