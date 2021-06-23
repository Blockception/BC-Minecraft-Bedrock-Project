import { Json } from "../../Parse/Json";
import { ScriptContainer } from "../Types/Script";

/**The interface that deals with entity events that add or remove component groups*/
export interface EntityEventGroup {
  /**The group of entity events*/
  component_groups?: string[];
}

/** */
export interface EntityEvent {
  /** */
  add?: EntityEventGroup;
  /** */
  remove?: EntityEventGroup;
  /** */
  sequence?: EntityEvent[];
  /** */
  randomize?: (EntityEvent & { weight: number })[];
}

/** */
export interface EntityComponentContainer {
  /** */
  [key: string]: any;
}

/** */
export interface EntityDescription extends ScriptContainer {
  /** */
  identifier: string;
  /** */
  is_spawnable?: true;
  /** */
  is_summonable?: true;
}

/** */
export interface Entity {
  /** */
  format_version: string;
  /** */
  "minecraf:entity": {
    /** */
    description: EntityDescription;
    /** */
    component_groups: {
      /** */
      [group: string]: EntityComponentContainer;
    };
    /** */
    components: EntityComponentContainer;
    /** */
    events: EntityEvent;
  };
}

/** */
export namespace Entity {
  /**Loads the given file as an Entity interface
   * @param filepath The filepath to a json file
   * @returns Either undefined if something went wrong or the file as an Entity object*/
  export function Load(filepath: string): Entity | undefined {
    return Json.load<Entity>(filepath, ensure);
  }

  /**Ensures the given object adheres to the basics of the interface
   * @param value A suspected incomplete value object*/
  export function ensure(value: Entity): void {
    if (!value.format_version) value.format_version = "";

    let me = value["minecraf:entity"];

    if (!me.component_groups) me.component_groups = {};
    if (!me.components) me.components = {};
    if (!me.description) me.description = { identifier: "" };
    if (!me.events) me.events = {};
  }
}
