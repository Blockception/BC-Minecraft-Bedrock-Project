import { Documentation } from "../../../../Types/Documentated/include";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Function } from "./Function";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Function | undefined {
  const uri = doc.uri;
  let index = uri.indexOf("functions");

  if (index < 0) return undefined;
  index += 10;

  let id = uri.substring(index, uri.length).replace(/\\/g, "/");
  id = id.replace(".mcfunction", "");

  if (id.includes(" ") || id.includes("\t")) {
    id = `"${id}"`;
  }

  const out: Function = {
    id: id,
    location: Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Mcfunction: ${id}`),
  };

  return out;
}
