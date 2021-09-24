import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../../Types/Documentation/Documentation";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { LootTable } from "./LootTable";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): LootTable | undefined {
  const uri = doc.uri;
  const index = uri.indexOf("loot_tables");

  if (index < 0) return undefined;

  const id = uri.substring(index, uri.length).replace(/\\/g, "/");

  const out: LootTable = {
    id: id,
    location: Types.Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Loot table: ${id}`),
  };

  return out;
}
