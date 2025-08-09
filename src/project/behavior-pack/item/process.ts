import * as internal from "../../../internal/behavior-pack/item";
import { Json } from "../../../internal/json";
import { Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types";
import { TextDocument } from "../../../types";
import { Item } from "./item";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Item | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Item>(doc);

  if (!internal.Item.is(imp)) return undefined;

  const container = imp["minecraft:item"];
  const id = container.description.identifier;

  const out: Item = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: Molang.MolangSet.harvest(container, content),
    documentation: Documentation.getDoc(
      doc,
      () => `BP Item: ${id} ${container.description.category ? "category: " + container.description.category : ""}`
    ),
    isFood: typeof container.components["minecraft:food"] === "object" ? true : false,
  };

  return out;
}
