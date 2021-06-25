import * as internal from "../../../../Internal/ResourcePack/TextureAtlas";
import { Json } from "../../../../Internal/Json";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Texture } from "./include";
import { Documentation } from "../../../../Types/Documentated/include";
import { Map } from "../../../../Types/Map/Map";

/**
 *
 * @param doc
 * @returns
 */
export function ProcessTextureAtlas(doc: TextDocument): Texture[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.TextureAtlas>(content);

  if (!internal.TextureAtlas.is(imp)) return undefined;

  const container = imp.texture_data;
  const out: Texture[] = [];

  Map.forEach(container, (value, key) => {
    out.push({
      id: key,
      location: Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Texture: ${key}`),
    });
  });

  return out;

  return;
}
