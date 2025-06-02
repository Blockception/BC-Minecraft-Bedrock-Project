import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/behavior-pack/item_catalog";
import { Json } from "../../../internal/json";
import { TextDocument } from "../../../types";
import { Group } from "./item_catalog";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Group[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.ItemCatalog>(doc);

  if (!Internal.ItemCatalog.is(imp)) return undefined;

  const out: Group[] = []
  imp['minecraft:crafting_items_catalog'].categories.flatMap(category => category.groups).forEach(entry => {
    const id = entry.group_identifier?.name
    if (!id) return
    out.push({
      id: id,
      location: Types.Location.create(uri, content.indexOf(id)),
      documentation: `Item Group: ` + id,
      items: entry.items.map(item => typeof item === 'string' ? item : item.name)
    })
  })

  return out;
}
