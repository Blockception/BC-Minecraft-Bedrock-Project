import * as Internal from "../../../internal/resource-pack";
import { Json } from "../../../internal";
import { Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument, Documentation } from "../../../types";
import { Entity } from "./entity";
import { DefinedUsing } from "bc-minecraft-molang";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Entity | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Entity>(doc);

  if (!Internal.Entity.is(imp)) return undefined;

  const description = imp["minecraft:client_entity"].description;
  const id = description.identifier;
  const out: Entity = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: Molang.MolangFullSet.harvest(description),
    animations: DefinedUsing.create(),
    documentation: Documentation.getDoc(doc, () => `Entity: ${id}`),
  };
  Molang.MolangFullSet.fromScript(description.scripts ?? {}, out.molang);

  //Process animations
  Types.Definition.forEach(description.animations, (reference, id) => {
    out.animations.defined.push(reference);
    out.animations.using.push(id);
  });

  //Process Animation controller
  description.animation_controllers?.forEach((item) => {
    const temp = flatten(item);
    if (temp) out.animations.using.push(temp);
  });

  //Process geometries
  Types.Definition.forEach(description.geometry, (reference, id) => {
    out.molang.geometries.defined.push(reference);
    out.molang.geometries.using.push(removePrefix(id));
  });

  //Process materials
  Types.Definition.forEach(description.materials, (reference, id) => {
    out.molang.materials.defined.push(reference);
    out.molang.materials.using.push(removePrefix(id));
  });

  //Process textures
  Types.Definition.forEach(description.textures, (reference, id) => {
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

function removePrefix(id: string): string {
  const index = id.indexOf(".");

  if (index > -1) return id.slice(index + 1);

  return id;
}
