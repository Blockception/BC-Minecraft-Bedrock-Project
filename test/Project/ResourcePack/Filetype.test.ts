import { expect } from "chai";
import path from "path";
import { ResourcePack } from "../../../src/main";

const FileType = ResourcePack.Enum.FileType;

describe("RP Filetype", () => {
  describe("Detect", () => {
    const DetectTests = [
      ["F:\\Example-rp\\animation_controllers\\example.controller.json", FileType.animation_controller],
      ["F:\\Example-rp\\animations\\example.animation.json", FileType.animation],
      ["F:\\Example-rp\\attachables\\example.json", FileType.attachable],
      ["F:\\Example-rp\\entity\\pig.entity.json", FileType.entity],
      ["F:\\Example-rp\\models\\pig.geo.json", FileType.model],
      ["F:\\Example-rp\\models\\entities\\pig.geo.json", FileType.model],
      ["F:\\Example-rp\\particles\\example.particle.json", FileType.particle],
      ["F:\\Example-rp\\render_controllers\\example.controller.json", FileType.render_controller],
      ["F:\\Example-rp\\textures\\entities\\custom\\pig.png", FileType.texture],

      ["F:\\Example-rp\\biomes_client.json", FileType.biomes_client],
      ["F:\\Example-rp\\blocks.json", FileType.block],
      ["F:\\Example-rp\\textures\\flipbook_textures.json", FileType.texture_flipbook_atlas],
      ["F:\\Example-rp\\textures\\item_texture.json", FileType.texture_item_atlas],
      ["F:\\Example-rp\\manifest.json", FileType.manifest],
      ["F:\\Example-rp\\sounds\\music_definitions.json", FileType.music_definitions],
      ["F:\\Example-rp\\sounds\\sound_definitions.json", FileType.sounds_definitions],
      ["F:\\Example-rp\\sounds.json", FileType.sounds],
      ["F:\\Example-rp\\textures\\terrain_texture.json", FileType.texture_terrain_atlas],

      ["F:\\Example\\animation_controllers\\example.controller.json", FileType.animation_controller],
      ["F:\\Example\\animations\\example.animation.json", FileType.animation],
      ["F:\\Example\\attachables\\example.json", FileType.attachable],
      ["F:\\Example\\entity\\pig.entity.json", FileType.entity],
      ["F:\\Example\\models\\pig.geo.json", FileType.model],
      ["F:\\Example\\models\\entities\\pig.geo.json", FileType.model],
      ["F:\\Example\\particles\\example.particle.json", FileType.particle],
      ["F:\\Example\\render_controllers\\example.controller.json", FileType.render_controller],
      ["F:\\Example\\textures\\entities\\custom\\pig.png", FileType.texture],

      ["F:\\Example\\biomes_client.json", FileType.biomes_client],
      ["F:\\Example\\blocks.json", FileType.block],
      ["F:\\Example\\textures\\flipbook_textures.json", FileType.texture_flipbook_atlas],
      ["F:\\Example\\textures\\item_texture.json", FileType.texture_item_atlas],
      ["F:\\Example\\manifest.json", FileType.manifest],
      ["F:\\Example\\sounds\\music_definitions.json", FileType.music_definitions],
      ["F:\\Example\\sounds\\sound_definitions.json", FileType.sounds_definitions],
      ["F:\\Example\\sounds.json", FileType.sounds],
      ["F:\\Example\\textures\\terrain_texture.json", FileType.texture_terrain_atlas],
    ];

    DetectTests.forEach((item) => {
      it(<string>item[0], () => {
        let filepath = <string>item[0];
        const expected = item[1] as keyof typeof FileType;

        if (path.sep !== "\\") filepath = filepath.replace(/\\/gi, "/");

        const test = FileType.detect(path.normalize(filepath));

        expect(test).to.equal(expected, `${FileType[test]} was not ${FileType[expected]}`);
      });
    });
  });
});
