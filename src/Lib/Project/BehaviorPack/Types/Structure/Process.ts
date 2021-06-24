import { Documentation } from "../../../../Types/Documentated/include";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Structure } from "./include";

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

  const out: Structure = {
    id: id,
    location: Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `McStructure: ${id}`),
  };

  return out;
}
