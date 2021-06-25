/** */
export enum FileType {
  /** */
  animation,
  /** */
  animation_controller,
  /** */
  attachable,
  /** */
  biomes_client,
  /** */
  block,
  /** */
  entity,
  /** */
  fog,
  /** */
  item,
  /** */
  manifest,
  /** */
  material,
  /** */
  model,
  /** */
  music_definitions,
  /** */
  particle,
  /** */
  render_controller,
  /** */
  sounds,
  /** */
  sounds_definitions,
  /** */
  spawn_rule,
  /** */
  texture,
  /** */
  texture_flipbook_atlas,
  /** */
  texture_item_atlas,
  /** */
  texture_terrain_atlas,
  /** */
  unknown,
}

/** */
export namespace FileType {
  /**Detects resource pack resource, already assumed the path belongs to a resource pack
   * @param uri the decoded uri, expects slashes to be '/'*/
  export function detect(uri: string): FileType {
    //Folders
    if (uri.includes("/animation_controllers/")) return FileType.animation_controller;
    if (uri.includes("/animations/")) return FileType.animation;
    if (uri.includes("/attachables/")) return FileType.attachable;
    if (uri.includes("/models/entity/")) return FileType.model;
    if (uri.includes("/models/entities/")) return FileType.model;
    if (uri.includes("/entity/")) return FileType.entity;
    if (uri.includes("/particles/")) return FileType.particle;
    if (uri.includes("/render_controllers/")) return FileType.render_controller;

    const index = uri.lastIndexOf("/");
    const filename = uri.substring(index + 1, uri.length);

    switch (filename) {
      case "biomes_client":
        return FileType.biomes_client;

      case "blocks":
        return FileType.block;

      case "flipbook_textures":
        return FileType.texture_flipbook_atlas;

      case "item_texture":
        return FileType.texture_item_atlas;

      case "manifest":
        return FileType.manifest;

      case "music_definitions":
        return FileType.music_definitions;

      case "sound_definitions":
        return FileType.sounds_definitions;

      case "sounds":
        return FileType.sounds;

      case "terrain_texture":
        return FileType.texture_terrain_atlas;
    }

    if (uri.includes("/textures/")) return FileType.texture;

    return FileType.unknown;
  }
}
