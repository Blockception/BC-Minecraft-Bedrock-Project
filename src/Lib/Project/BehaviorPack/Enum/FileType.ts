/***/
export enum FileType {  
  /***/
  animation,
  /***/
  animation_controller,
  /***/
  block,
  /***/
  entity,
  /***/
  function,
  /***/
  item,
  /***/
  loot_table,
  /***/
  manifest,
  /***/
  script,
  /***/
  spawn_rule,
  /***/
  structure,
  /***/
  trading,
  /***/
  unknown,
}

export namespace FileType {
  /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
  * @param uri The filepath to examine, expects slashes to be '/'*/
  export function detect(uri: string): FileType {
      if (uri.endsWith(".mcfunction")) return FileType.function;

      //Folders
      if (uri.includes("/animation_controllers/")) return FileType.animation_controller;
      if (uri.includes("/animations/")) return FileType.animation;
      if (uri.includes("/blocks/")) return FileType.block;
      if (uri.includes("/entities/")) return FileType.entity;
      if (uri.includes("/functions/")) return FileType.function;
      if (uri.includes("/items/")) return FileType.item;
      if (uri.includes("/loot_tables/")) return FileType.loot_table;
      if (uri.includes("/scripts/")) return FileType.script;
      if (uri.includes("/spawn_rules/")) return FileType.spawn_rule;
      if (uri.includes("/trading/")) return FileType.trading;

      //Files
      if (uri.includes("manifest.json")) return FileType.manifest;

      return FileType.unknown;
    }
  }
}
