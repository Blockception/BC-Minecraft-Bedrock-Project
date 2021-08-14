import * as internal from "../../../../Internal/BehaviorPack/Item";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../../Types/Documentated/Documentated";
import { Map } from "../../../../Types/Map/Map";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Item } from "./include";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Item | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Item>(content);

  if (!internal.Item.is(imp)) return undefined;

  const container = imp["minecraft:item"];
  const id = container.description.identifier;

  const out: Item = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: MolangSet.harvest(container),
    documentation: Documentation.getDoc(doc, () => `BP Item: ${id} ${container.description.category ? "category: " + container.description.category : ""}`),
  };

  return out;
}
