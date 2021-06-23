import { expect } from "chai";
import { PackType } from "./PackType";

describe("PackType", () => {
  it("world", () => {
    expect(PackType.detect("F:/Temp2/world/manifest.json")).to.equal(PackType.world);
    expect(PackType.detect("F:/Temp2/world_template/manifest.json")).to.equal(PackType.world);
    expect(PackType.detect("F:/Temp2/world/db/000005.ldb")).to.equal(PackType.world);
    expect(PackType.detect("F:/Temp2/wp/db/000006.log")).to.equal(PackType.world);
  });

  it("behavior", () => {
    expect(PackType.detect("F:/Temp2/world/behavior_packs/EW-BP/manifest.json")).to.equal(PackType.behavior_pack);
    expect(PackType.detect("F:/Temp2/world_template/behavior_packs/EW-BP/manifest.json")).to.equal(PackType.behavior_pack);

    expect(PackType.detect("F:/Temp2/world/behavior_packs/EW-bp/manifest.json")).to.equal(PackType.behavior_pack);
    expect(PackType.detect("F:/Temp2/world_template/behavior_packs/EW-Bp/manifest.json")).to.equal(PackType.behavior_pack);

    expect(PackType.detect("F:/Temp2/1. Behavior Pack/manifest.json")).to.equal(PackType.behavior_pack);
  });

  it("resource", () => {
    expect(PackType.detect("F:/Temp2/world/resource_packs/EW-RP/manifest.json")).to.equal(PackType.resource_pack);
    expect(PackType.detect("F:/Temp2/world_template/resource_packs/EW-RP/manifest.json")).to.equal(PackType.resource_pack);

    expect(PackType.detect("F:/Temp2/world/resource_packs/EW-rp/manifest.json")).to.equal(PackType.resource_pack);
    expect(PackType.detect("F:/Temp2/world_template/resource_packs/EW-Rp/manifest.json")).to.equal(PackType.resource_pack);

    expect(PackType.detect("F:/Temp2/2. Resource Pack/manifest.json")).to.equal(PackType.resource_pack);
  });

  it("skin pack", () => {
    expect(PackType.detect("F:/Temp2/skin_pack/skins.json")).to.equal(PackType.skin_pack);
  });
});
