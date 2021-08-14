import * as internal from "../../../../Internal/ResourcePack/Material";
import { Json } from "../../../../Internal/Json";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Material } from "./include";
import { Documentation } from "../../../../Types/Documentated/include";
import { Map } from "../../../../Types/Map/Map";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Material[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Material>(content);

  if (!internal.Material.is(imp)) return undefined;

  const out: Material[] = [];

  Map.forEach<any>(imp, (value, key) => {
    if (key !== "format_version") {
      out.push({
        id: key,
        location: Location.create(uri, content.indexOf(key)),
        documentation: Documentation.getDoc(doc, () => `Material: ${key}`),
      });
    }
  });

  return out;
}