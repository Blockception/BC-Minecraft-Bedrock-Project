import * as internal from "../../../../Internal/ResourcePack/Entity";
import { Json } from "../../../../Internal/Json";
import { MolangFullSet } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Entity } from "./Entity";
import { DefinedUsing } from "bc-minecraft-molang";
import { Documentation } from "../../../../Types/Documentation/Documentation";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Entity | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Entity>(content);

  if (!internal.Entity.is(imp)) return undefined;

  const container = imp["minecraft:client_entity"].description;
  const id = container.identifier;
  const out: Entity = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: MolangFullSet.harvest(container),
    animations: DefinedUsing.create(),
    documentation: Documentation.getDoc(doc, () => `Entity: ${id}`),
  };

  //Process animations
  Types.Definition.forEach(container.animations, (reference, id) => {
    out.animations.defined.push(reference);
    out.animations.using.push(id);
  });

  //Process Animation controller
  container.animation_controllers?.forEach((item) => {
    const temp = flatten(item);
    if (temp) out.animations.using.push(temp);
  });

  //Process geometries
  Types.Definition.forEach(container.geometry, (reference, id) => {
    out.molang.geometries.defined.push(reference);
    out.molang.geometries.using.push(removePrefix(id));
  });

  //Process materials
  Types.Definition.forEach(container.materials, (reference, id) => {
    out.molang.materials.defined.push(reference);
    out.molang.materials.using.push(removePrefix(id));
  });

  //Process textures
  Types.Definition.forEach(container.textures, (reference, id) => {
    out.molang.textures.defined.push(reference);
    out.molang.textures.using.push(id);
  });

  return out;
}

function flatten(data: string | Types.Definition): string | undefined {
  if (typeof data === "string") return data;

  const key = Object.getOwnPropertyNames(data)[0];

  if (key) return data[key];

  return undefined;
}

function removePrefix(id : string) : string {
  const index = id.indexOf('.');

  if (index > -1) return id.slice(index + 1);

  return id;
}