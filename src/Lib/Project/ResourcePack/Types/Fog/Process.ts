import * as internal from "../../../../Internal/ResourcePack/Fog";
import { Json } from "../../../../Internal/Json";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Fog } from "./include";
import { Documentation } from "../../../../Types/Documentated/include";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Fog | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Fog>(content);

  if (!internal.Fog.is(imp)) return undefined;

  const container = imp["minecraft:fog_settings"];
  const id = container.description.identifier;
  const out: Fog = {
    id: id,
    location: Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Fog: ${id}`),
  };

  return out;
}
