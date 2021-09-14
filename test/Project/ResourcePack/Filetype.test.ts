import { expect } from "chai";
import path from "path";
import { ResourcePack } from "../../../src/main";

describe("RP Filetype", () => {
  describe("Detect", () => {
    const DetectTests = [
      ["F:\\Example-rp\\animation_controllers\\example.controller.json", ResourcePack.FileType.animation_controller],
      ["F:\\Example-rp\\animations\\example.animation.json", ResourcePack.FileType.animation],
      ["F:\\Example-rp\\attachables\\example.json", ResourcePack.FileType.attachable],
      ["F:\\Example-rp\\entity\\pig.entity.json", ResourcePack.FileType.entity],
      ["F:\\Example-rp\\models\\pig.geo.json", ResourcePack.FileType.model],
      ["F:\\Example-rp\\models\\entities\\pig.geo.json", ResourcePack.FileType.model],
      ["F:\\Example-rp\\particles\\example.particle.json", ResourcePack.FileType.particle],
      ["F:\\Example-rp\\render_controllers\\example.controller.json", ResourcePack.FileType.render_controller],
      ["F:\\Example-rp\\textures\\entities\\custom\\pig.png", ResourcePack.FileType.texture],

      ["F:\\Example-rp\\biomes_client.json", ResourcePack.FileType.biomes_client],
      ["F:\\Example-rp\\blocks.json", ResourcePack.FileType.block],
      ["F:\\Example-rp\\textures\\flipbook_textures.json", ResourcePack.FileType.texture_flipbook_atlas],
      ["F:\\Example-rp\\textures\\item_texture.json", ResourcePack.FileType.texture_item_atlas],
      ["F:\\Example-rp\\manifest.json", ResourcePack.FileType.manifest],
      ["F:\\Example-rp\\sounds\\music_definitions.json", ResourcePack.FileType.music_definitions],
      ["F:\\Example-rp\\sounds\\sound_definitions.json", ResourcePack.FileType.sounds_definitions],
      ["F:\\Example-rp\\sounds.json", ResourcePack.FileType.sounds],
      ["F:\\Example-rp\\textures\\terrain_texture.json", ResourcePack.FileType.texture_terrain_atlas],

      ["F:\\Example\\animation_controllers\\example.controller.json", ResourcePack.FileType.animation_controller],
      ["F:\\Example\\animations\\example.animation.json", ResourcePack.FileType.animation],
      ["F:\\Example\\attachables\\example.json", ResourcePack.FileType.attachable],
      ["F:\\Example\\entity\\pig.entity.json", ResourcePack.FileType.entity],
      ["F:\\Example\\models\\pig.geo.json", ResourcePack.FileType.model],
      ["F:\\Example\\models\\entities\\pig.geo.json", ResourcePack.FileType.model],
      ["F:\\Example\\particles\\example.particle.json", ResourcePack.FileType.particle],
      ["F:\\Example\\render_controllers\\example.controller.json", ResourcePack.FileType.render_controller],
      ["F:\\Example\\textures\\entities\\custom\\pig.png", ResourcePack.FileType.texture],

      ["F:\\Example\\biomes_client.json", ResourcePack.FileType.biomes_client],
      ["F:\\Example\\blocks.json", ResourcePack.FileType.block],
      ["F:\\Example\\textures\\flipbook_textures.json", ResourcePack.FileType.texture_flipbook_atlas],
      ["F:\\Example\\textures\\item_texture.json", ResourcePack.FileType.texture_item_atlas],
      ["F:\\Example\\manifest.json", ResourcePack.FileType.manifest],
      ["F:\\Example\\sounds\\music_definitions.json", ResourcePack.FileType.music_definitions],
      ["F:\\Example\\sounds\\sound_definitions.json", ResourcePack.FileType.sounds_definitions],
      ["F:\\Example\\sounds.json", ResourcePack.FileType.sounds],
      ["F:\\Example\\textures\\terrain_texture.json", ResourcePack.FileType.texture_terrain_atlas],
    ];

    DetectTests.forEach((item) => {
      it(<string>item[0], () => {
        let filepath = <string>item[0];
        const expected = <ResourcePack.FileType>item[1];

        if (path.sep !== "\\") filepath = filepath.replace(/\\/gi, "/");

        const test = ResourcePack.FileType.detect(path.normalize(filepath));

        expect(test).to.equal(expected, `${ResourcePack.FileType[test]} was not ${ResourcePack.FileType[expected]}`);
      });
    });
  });
});
