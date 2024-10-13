import { SMap } from "./SMap";

interface Variant {
  "minecraft:variant": {
    value: number;
  };
}

const Dataset: SMap<Variant> = {
  "self:variant_0": { "minecraft:variant": { value: 0 } },
  "self:variant_1": { "minecraft:variant": { value: 1 } },
  "self:variant_2": { "minecraft:variant": { value: 2 } },
  "self:variant_3": { "minecraft:variant": { value: 3 } },
  "self:variant_4": { "minecraft:variant": { value: 4 } },
  "self:variant_5": { "minecraft:variant": { value: 5 } },
  "self:variant_6": { "minecraft:variant": { value: 6 } },
  "self:variant_7": { "minecraft:variant": { value: 7 } },
};

describe("Map", () => {
  it("forEach", () => {
    const names: string[] = [];

    SMap.forEach(Dataset, (group, name) => {
      names.push(name);
    });

    expect(names).toEqual(
      expect.arrayContaining([
        "self:variant_0",
        "self:variant_1",
        "self:variant_2",
        "self:variant_3",
        "self:variant_4",
        "self:variant_5",
        "self:variant_6",
        "self:variant_7",
      ])
    );
  });

  it("property names", () => {
    const keys = Object.getOwnPropertyNames(Dataset);

    expect(keys).toHaveLength(8);
  });
});
