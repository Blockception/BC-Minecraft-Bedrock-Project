import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types/Documentation";
import { TextDocument } from "../../../types/TextDocument";
import { Trading } from "./trading";

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
    location: Types.Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Trading table: ${id}`),
  };

  return out;
}
