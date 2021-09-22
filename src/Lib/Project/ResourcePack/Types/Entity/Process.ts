import * as internal from "../../../../Internal/ResourcePack/Entity";
import { Json } from "../../../../Internal/Json";
import { MolangFullSet } from "../../../../Molang/MolangSet";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Entity } from "./Entity";
import { DefinedUsing } from "../../../../Types/Defined Using/include";
import { Definition } from "../../../../Internal/Types/Definition";
import { Documentation } from "../../../../Types/Documentated/Documentated";

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

  if (container.animations)
    Definition.forEach(container.animations, (value, key) => {
      out.animations.defined.push(key);
      out.animations.using.push(value);
    });

  //Animation controller
  if (container.animation_controllers)
    container.animation_controllers.forEach((item) => {
      const temp = flatten(item);
      if (temp) out.animations.using.push(temp);
    });

  return out;
}

function flatten(data: string | Definition): string | undefined {
  if (typeof data === "string") return data;

  const key = Object.getOwnPropertyNames(data)[0];

  if (key) return data[key];

  return undefined;
}
