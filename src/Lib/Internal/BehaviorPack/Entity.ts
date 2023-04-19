import { ComponentContainer, ComponentGroups } from "bc-minecraft-bedrock-types/lib/src/Minecraft/Components";
import { SMap } from "../../Types/SMap";
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
  /** */
  set_property?: Record<string, string | number | boolean>;
}

/**
 * @deprecated Replace with @see {@link ComponentContainer}
 */
export type EntityComponentContainer = ComponentContainer;

/** */
export interface EntityDescription extends ScriptContainer {
  /** */
  identifier: string;
  /** */
  is_spawnable?: boolean;
  /** */
  is_summonable?: boolean;
  /** */
  is_experimental: boolean;
  /** */
  properties?: Record<string, any>;
}

/** */
export interface Entity {
  /** */
  format_version: string;
  /** */
  "minecraft:entity": {
    /** */
    description: EntityDescription;
    /** */
    component_groups?: ComponentGroups;
    /** */
    components: ComponentContainer;
    /** */
    events?: SMap<EntityEvent>;
  };
}

/** */
export namespace Entity {
  /**
   *
   * @param value
   */
  export function is(value: any): value is Entity {
    if (
      typeof value === "object" &&
      typeof value.format_version === "string" &&
      typeof value["minecraft:entity"] === "object"
    ) {
      const b = value["minecraft:entity"];

      if (
        typeof b.description === "object" &&
        typeof b.description.identifier === "string" &&
        typeof b.components === "object"
      ) {
        return true;
      }
    }

    return false;
  }
}
