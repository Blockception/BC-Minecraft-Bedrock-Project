import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/resource-pack";
import { Documentation, TextDocument } from "../../../types";
import { References } from "../../../types/references";
import { harvestMolang } from "../../molang/harvest";
import { Entity } from "./entity";

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
    molang: harvestMolang(content, description),
    animations: References.empty(),
    documentation: Documentation.getDoc(doc, () => `Entity: ${id}`),
  };

  //process animations
  Types.Definition.forEach(description.animations, (reference, id) => {
    out.animations.defined.push(reference);
    out.animations.using.push(id);
  });

  //process Animation controller
  description.animation_controllers?.forEach((item) => {
    const temp = flatten(item);
    if (temp) out.animations.using.push(temp);
  });

  return out;
}

function flatten(data: string | Types.Definition): string | undefined {
  if (typeof data === "string") return data;

  const key = Object.getOwnPropertyNames(data)[0];

  if (key) return data[key];

  return undefined;
}
