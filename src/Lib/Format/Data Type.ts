/**The type that specifies what type of minecraft bedrock file the type is*/
export enum DataType {
  /**A bp animation controller*/
  behavior_animation_controller,
  /**A bp animation*/
  behavior_animation,
  /**A bp block*/
  behavior_block,
  /**A bp entity*/
  behavior_entity,
  /**A mcfunction*/
  behavior_function,
  /**A bp item*/
  behavior_item,
  /**A bp loot table*/
  behavior_loot_table,
  /**A bp manifest*/
  behavior_manifest,
  /**A bp script*/
  behavior_script,
  /**A bp spawn rules*/
  behavior_spawn_rules,
  /**A bp trade*/
  behavior_trade,

  /**A rp animation controller*/
  resource_animation_controller,
  /**A rp animation*/
  resource_animation,
  /**A rp attachable item*/
  resource_attachable,
  /**A rp block*/
  resource_blocks,
  /**A rp block model*/
  resource_block_model,
  /**The rp biomes client file*/
  resource_biomes_client,
  /**A rp entity*/
  resource_entity,
  /**A rp entity model*/
  resource_entity_model,
  /**A rp item*/
  resource_item,
  /**A rp manifest*/
  resource_manifest,
  /**A rp model*/
  resource_model,
  /**A rp particle*/
  resource_particle,
  /**A rp render controller*/
  resource_render_controller,
  /**A rp sounds*/
  resource_sounds,
  /**The rp sounds_definitions file*/
  resource_sounds_definitions,
  /**The rp music_definitions file*/
  resource_music_definitions,
  /**The rp texture_flipbook_atlas file*/
  resource_texture_flipbook_atlas,
  /**The rp texture_item_atlas*/
  resource_texture_item_atlas,
  /**The rp texture_terrain_atlas*/
  resource_texture_terrain_atlas,

  /**A world manifest*/
  world_manifest,

  /**UNKNOWN FILE, probally good to ignore it*/
  unknown,
}
