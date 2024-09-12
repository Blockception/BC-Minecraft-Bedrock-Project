import * as Internal from "../../../Internal/ResourcePack";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../Types/TextDocument";
import { Fog } from "./Fog";
import { Documentation } from "../../../Types/Documentation";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Fog | undefined {
  const imp = TextDocument.toObject(doc, Internal.Fog.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const container = imp["minecraft:fog_settings"];
  const id = container.description.identifier;
  
  const out: Fog = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Fog: ${id}`),
  };

  return out;
}
