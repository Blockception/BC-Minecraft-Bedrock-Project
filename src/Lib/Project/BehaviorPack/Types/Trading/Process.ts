import { Documentation } from "../../../../Types/Documentated/include";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Trading } from "./include";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Trading | undefined {
  const uri = doc.uri;
  const index = uri.indexOf("trading");

  if (index < 0) return undefined;

  const id = uri.substring(index, uri.length).replace(/\\/g, "/");

  const out: Trading = {
    id: id,
    location: Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Trading table: ${id}`),
  };

  return out;
}
