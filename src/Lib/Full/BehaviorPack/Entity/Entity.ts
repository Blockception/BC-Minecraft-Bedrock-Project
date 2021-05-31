import { ScriptContainer } from "../../Types/Script";

export interface EntityEventGroup {
  component_groups?: string[];
}

export interface EntityEvent {
  add?: EntityEventGroup;
  remove?: EntityEventGroup;
  sequence?: EntityEvent[];
  randomize?: (EntityEvent & { weight: number })[];
}

export interface EntityComponentContainer {
  [key: string]: any;
}

export interface EntityDescription extends ScriptContainer {
  identifier: string;
  is_spawnable?: true;
  is_summonable?: true;
}

export interface Entity {
  format_version: string;
  "minecraf:entity": {
    description: EntityDescription;
    component_groups: {
      [group: string]: EntityComponentContainer;
    };
    components: EntityComponentContainer;
    events: {};
  };
}
