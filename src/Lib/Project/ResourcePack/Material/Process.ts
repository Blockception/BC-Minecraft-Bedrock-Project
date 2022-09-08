import * as internal from "../../../Internal/ResourcePack/Material";
import { Json } from "../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../Types/TextDocument";
import { Material } from "./Material";
import { Documentation } from "../../../Types/Documentation";
import { SMap } from "../../../Types/SMap";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Material[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Material>(doc);

  if (!internal.Material.is(imp)) return undefined;

  const out: Material[] = [];

  SMap.forEach<any>(imp, (value, key) => {
    if (key !== "format_version") {
      out.push({
        id: key,
        location: Types.Location.create(uri, content.indexOf(key)),
        documentation: Documentation.getDoc(doc, () => `Material: ${key}`),
      });
    }
  });

  return out;
}
