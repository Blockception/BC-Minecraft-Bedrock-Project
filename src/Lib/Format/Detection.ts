import { DataType as DT } from "./Data Type";
import { GeneralDataType as GDT } from "./General Data Type";

export namespace Detect {
  const BPmarkings = /[\/\\].*(bp|behav(ior|iour)([ _-]|)pack).*[\/\\]/i;
  const RPmarkings = /[\/\\].*(rp|resource([ _-]|)pack).*[\/\\]/i;
  const Worldmarkings = /[\/\\].*(wp|world).*[\/\\]/i;

  /**Detects the type of data from the given uri
   * @param uri The filepath to examine, expects slashes to be '/'*/
  export function DataType(uri: string): DT {
    //Has bp markings
    if (BPmarkings.test(uri)) return BehaviorType(uri);

    //Has rp markings
    if (RPmarkings.test(uri)) return ResourceType(uri);

    //is manifest
    if (uri.endsWith("manifest.json")) return DT.world_manifest;

    return DT.unknown;
  }

  /**Detects the type of general data from the given uri
   * @param uri The filepath to examine, expects slashes to be '/'*/
  export function GeneralDataType(uri: string): GDT {
    if (BPmarkings.test(uri)) return GDT.behavior_pack;
    if (RPmarkings.test(uri)) return GDT.resource_pack;
    if (Worldmarkings.test(uri)) return GDT.world;

    return GDT.unknown;
  }

  /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
   * @param uri The filepath to examine, expects slashes to be '/'*/
  export function BehaviorType(uri: string): DT {
    if (uri.endsWith(".mcfunction")) return DT.behavior_function;

    //Folders
    if (uri.includes("/loot_tables/")) return DT.behavior_loot_table;
    if (uri.includes("/animation_controllers/")) return DT.behavior_animation_controller;
    if (uri.includes("/animations/")) return DT.behavior_animation;
    if (uri.includes("/blocks/")) return DT.behavior_block;
    if (uri.includes("/entities/")) return DT.behavior_entity;
    if (uri.includes("/functions/")) return DT.behavior_function;
    if (uri.includes("/items/")) return DT.behavior_item;
    if (uri.includes("/scripts/")) return DT.behavior_script;
    if (uri.includes("/spawn_rules/")) return DT.behavior_spawn_rules;
    if (uri.includes("/trading/")) return DT.behavior_trade;

    //Files
    if (uri.includes("manifest.json")) return DT.behavior_manifest;

    return DT.unknown;
  }

  /**
   * Detects resource pack resource, already assumed the path belongs to a resource pack
   * @param uri the decoded uri
   */
  export function ResourceType(uri: string): DT {
    //Folders
    if (uri.includes("/animation_controllers/")) return DT.resource_animation_controller;
    if (uri.includes("/animations/")) return DT.resource_animation;
    if (uri.includes("/attachables/")) return DT.resource_attachable;
    if (uri.includes("/models/entity/")) return DT.resource_entity_model;
    if (uri.includes("/models/entities/")) return DT.resource_entity_model;
    if (uri.includes("/entity/")) return DT.resource_entity;
    if (uri.includes("/particles/")) return DT.resource_particle;
    if (uri.includes("/render_controllers/")) return DT.resource_render_controller;

    const index = uri.lastIndexOf("/");
    const filename = uri.substring(index + 1, uri.length);

    switch (filename) {
      case "biomes_client":
        return DT.resource_biomes_client;

      case "blocks":
        return DT.resource_blocks;

      case "flipbook_textures":
        return DT.resource_texture_flipbook_atlas;

      case "item_texture":
        return DT.resource_texture_item_atlas;

      case "manifest":
        return DT.resource_manifest;

      case "music_definitions":
        return DT.resource_music_definitions;

      case "sound_definitions":
        return DT.resource_sounds_definitions;

      case "sounds":
        return DT.resource_sounds;

      case "terrain_texture":
        return DT.resource_texture_terrain_atlas;
    }

    return DT.unknown;
  }
}
