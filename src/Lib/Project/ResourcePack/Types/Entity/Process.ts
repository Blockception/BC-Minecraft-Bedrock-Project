import * as internal from "../../../../Internal/ResourcePack/Entity";
import { Json } from "../../../../Internal/Json";
import { MolangFullSet } from "../../../../Molang/MolangSet";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Entity } from "./include";
import { DefinedUsing } from "../../../../Types/Defined Using/include";
import { Documentation } from "../../../../Types/Documentated/include";
import { Definition } from "../../../../Internal/Types/Definition";

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

  const container = imp["minecraft:entity"];
  const id = container.description.identifier;
  const out: Entity = {
    id: id,
    location: Location.create(uri, content.indexOf(id)),
    molang: MolangFullSet.harvest(container),
    animations: DefinedUsing.create(),
    documentation: Documentation.getDoc(doc, () => `Entity Item: ${id}`),
  };

  if (container.animations)
    Definition.forEach(container.animations, (value, key) => {
      out.animations.defined.push(key);
      out.animations.using.push(value);
    });

  if (container.animation_controllers) container.animation_controllers.forEach((item) => out.animations.using.push(item));

  return out;
}
