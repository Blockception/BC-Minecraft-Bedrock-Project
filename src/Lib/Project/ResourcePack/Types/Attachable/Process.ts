import * as internal from "../../../../Internal/ResourcePack/Attachable";
import { Json } from "../../../../Internal/Json";
import { Molang } from "bc-minecraft-molang";
import { TextDocument } from "../../../../Types/TextDocument";
import { Attachable } from "./Attachable";
import { DefinedUsing } from "bc-minecraft-molang";
import { Documentation } from "../../../../Types/Documentation";
import { Types } from "bc-minecraft-bedrock-types";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Attachable | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Attachable>(doc);

  if (!internal.Attachable.is(imp)) return undefined;

  const container = imp["minecraft:attachable"];
  const id = container.description.identifier;
  const out: Attachable = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: Molang.MolangFullSet.harvest(container),
    animations: DefinedUsing.create(),
    documentation: Documentation.getDoc(doc, () => `Attachable Item: ${id}`),
  };

  if (container.animations)
    Types.Definition.forEach(container.animations, (value, key) => {
      out.animations.defined.push(key);
      out.animations.using.push(value);
    });

  if (container.animation_controllers) container.animation_controllers.forEach((item) => out.animations.using.push(item));

  return out;
}
