import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Structure } from "./Structure";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Structure | undefined {
  const uri = doc.uri;
  let index = uri.indexOf("structures");

  if (index < 0) return undefined;
  index += 11;

  let id = uri.substring(index, uri.length).replace(/\\/g, "/");
  id = id.replace("/", ":");
  id = id.replace(".mcstructure", "");

  if (id.includes('/')) {
    id = '"' + id + '"';
  }

  const out: Structure = {
    id: id,
    location: Types.Location.create(uri, 0),
    documentation: `McStructure: ${id}`,
  };

  return out;
}
