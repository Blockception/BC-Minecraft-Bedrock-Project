import * as Internal from "../../../internal/resource-pack";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../types/TextDocument";
import { Texture } from "./texture";
import { Documentation } from "../../../types/Documentation";
import { SMap } from "../../../types";

/**
 *
 * @param doc
 * @returns
 */
export function ProcessTextureAtlas(doc: TextDocument): Texture[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.TextureAtlas.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();

  const container = imp.texture_data;
  const out: Texture[] = [];

  SMap.forEach(container, (value, key) => {
    out.push({
      id: key,
      location: Types.Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Texture: ${key}`),
    });
  });

  return out;

  return;
}
