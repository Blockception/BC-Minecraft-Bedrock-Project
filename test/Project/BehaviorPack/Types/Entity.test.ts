import { expect } from "chai";
import { Json } from "../../../../src/Lib/Internal/Json";
import { Entity } from "../../../../src/Lib/Project/BehaviorPack/Types";
import { TextDocument } from "../../../../src/Lib/Types/TextDocument";
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

const EntityDoc: TextDocument = {
  uri: "C:\\temp.json",
  getText: (range) => EntityJson,
};

describe("Entity", () => {
  it("Data", () => {
    const imp = Json.To<internal.Entity>(EntityJson);

    it("Not Undefined", () => {
      expect(imp).to.not.be.undefined;
    });

    it("Is entity", () => {
      expect(internal.Entity.is(imp)).to.be.true;
    });
  });

  describe("Families", () => {
    const data = Entity.Process(EntityDoc);

    it("Not Undefined", () => {
      expect(data).to.not.be.undefined;
    });

    if (!data) return;

    it("Has specific families", () => {
      expect(data.families).has.members(["animal", "mob"]);
    });

    it("Has 2 families", () => {
      expect(data.families.length).to.equal(2);
    });
  });

  describe("Animations", () => {
    const data = Entity.Process(EntityDoc);

    it("Not Undefined", () => {
      expect(data).to.not.be.undefined;
    });

    if (!data) return;

    it("Has specific usings", () => {
      expect(data.animations.using).has.members([
        "controller.animation.chicken",
        "controller.i.dont.exist",
      ]);
    });

    it("Has specific defined", () => {
      expect(data.animations.defined).has.members(["controller", "something"]);
    });
  });

  describe("Events", () => {
    const data = Entity.Process(EntityDoc);

    it("Not Undefined", () => {
      expect(data).to.not.be.undefined;
    });

    if (!data) return;

    it("has specific member", () => {
      expect(data.events).has.members(["self:to"]);
    });
  });

  it("Groups", () => {
    const data = Entity.Process(EntityDoc);

    it("Not Undefined", () => {
      expect(data).to.not.be.undefined;
    });

    if (!data) return;

    it("has specific member", () => {
      expect(data.groups).has.members(["self:group1"]);
    });
  });

  it("ID", () => {
    const data = Entity.Process(EntityDoc);

    it("Not Undefined", () => {
      expect(data).to.not.be.undefined;
    });

    if (!data) return;

    it("has sheep identifier", ()=>{
      expect(data.id).to.equal("blockception:sheep");
    })
  });
});
