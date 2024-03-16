import * as Internal from "../../../Internal/ResourcePack";
import { Json } from "../../../Internal";
import { Molang } from "bc-minecraft-molang";
import { TextDocument } from "../../../Types/TextDocument";
import { Attachable } from "./Attachable";
import { DefinedUsing } from "bc-minecraft-molang";
import { Documentation } from "../../../Types/Documentation";
import { Types } from "bc-minecraft-bedrock-types";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Attachable | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Attachable>(doc);

  if (!Internal.Attachable.is(imp)) return undefined;

  const container = imp["minecraft:attachable"];
  const description = container.description;
  const id = description.identifier;
  const out: Attachable = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: Molang.MolangFullSet.harvest(container),
    animations: DefinedUsing.create(),
    documentation: Documentation.getDoc(doc, () => `Attachable Item: ${id}`),
  };

  if (description.animations) {
    Types.Definition.forEach(description.animations, (value, key) => {
      out.animations.defined.push(key);
      out.animations.using.push(value);
    });
  }

  if (description.animation_controllers) {
    description.animation_controllers.forEach((item) => out.animations.using.push(item));
  }

  return out;
}
