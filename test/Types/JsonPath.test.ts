import { expect } from "chai";
import { JsonPath } from "../../src/Lib/Types/Json/JsonPath";

const entity = `{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "blockception:example",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:behavior.look_at_player": { "probability": 1.0, "target_distance": 16 },
      "minecraft:damage_sensor": {
        "triggers": [
          { "cause": "all"}
        ]
      }
    },
    "events": {
    }
  }
}`;

describe("JsonPath", () => {
  it("offset 1", () => {
    expect(JsonPath.resolve(entity, "minecraft:entity")).to.equal(entity.indexOf("minecraft:entity"));
    expect(JsonPath.resolve(entity, "minecraft:entity/description")).to.equal(entity.indexOf("description"));
    expect(JsonPath.resolve(entity, "minecraft:entity/description/identifier")).to.equal(entity.indexOf("identifier"));
  });

  it("offset 2", () => {
    expect(JsonPath.resolve(entity, "minecraft:entity")).to.equal(entity.indexOf("minecraft:entity"));
    expect(JsonPath.resolve(entity, "minecraft:entity\\description")).to.equal(entity.indexOf("description"));
    expect(JsonPath.resolve(entity, "minecraft:entity\\description/identifier")).to.equal(entity.indexOf("identifier"));
  });
});
