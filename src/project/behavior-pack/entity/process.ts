import * as internal from "../../../internal/behavior-pack/entity";
import { Json } from "../../../internal/json";
import { Molang } from "bc-minecraft-molang";
import { DefinedUsing } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { SMap } from "../../../types";
import { TextDocument } from "../../../types/TextDocument";
import { Entity } from "./entity";
import { Documentation } from "../../../types/Documentation";
import { ComponentContainer } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { EntityProperty } from './properties';

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Entity | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Entity>(doc);

  if (!internal.Entity.is(imp)) return undefined;

  const container = imp["minecraft:entity"];
  const id = container.description.identifier;

  const out: Entity = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `BP Entity: ${id}`),
    animations: DefinedUsing.empty(),
    events: [],
    families: [],
    groups: [],
    molang: Molang.MolangSet.harvest(container),
    properties: [],
  };
  Molang.MolangFullSet.fromScript(container.description.scripts ?? {}, out.molang);

  if (container.component_groups) {
    SMap.forEach(container.component_groups, (group, name) => {
      out.groups.push(name);
      getFamilies(group, out.families);
    });
  }
  if (container.events) SMap.forEach(container.events, (event, name) => out.events.push(name));

  //Animations
  if (container.description.animations) {
    SMap.forEach(container.description.animations, (anim, name) => {
      out.animations.defined.push(name);
      out.animations.using.push(anim);
    });
  }

  if (container.description.properties) {
    for (const [name, property] of Object.entries(container.description.properties)) {
      out.properties.push({ name, ...property } as EntityProperty);
    }
  }

  getFamilies(container.components, out.families);

  return out;
}

function getFamilies(components: ComponentContainer, receiver: string[]) {
  const families = components["minecraft:type_family"];

  if (type_family.is(families)) {
    receiver.push(...families.family);
  }
}

interface type_family {
  family: string[];
}

namespace type_family {
  export function is(value: any): value is type_family {
    if (typeof value === "object" && Array.isArray(value.family)) {
      return true;
    }

    return false;
  }
}
