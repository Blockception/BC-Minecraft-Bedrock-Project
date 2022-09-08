import * as internal from "../../../Internal/ResourcePack/Model";
import { Json } from "../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../Types/TextDocument";
import { Model } from "./Model";
import { Documentation } from "../../../Types/Documentation";
import { SMap } from "../../../Types/SMap";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Model[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Model>(doc);

  if (!internal.Model.is(imp)) return undefined;

  const out: Model[] = [];

  if (internal.ModelLegacy.is(imp)) {
    SMap.forEach<any>(imp, (value, key) => {
      if (key !== "format_version") {
        out.push({
          id: key,
          location: Types.Location.create(uri, content.indexOf(key)),
          documentation: Documentation.getDoc(doc, () => `Model: ${key}`),
        });
      }
    });
  } else if (internal.ModelModern.is(imp)) {
    imp["minecraft:geometry"].forEach((model) => {
      if (internal.ModelModernSpec.is(model)) {
        const key = model.description.identifier;

        out.push({
          id: key,
          location: Types.Location.create(uri, content.indexOf(key)),
          documentation: Documentation.getDoc(doc, () => `Model: ${key}`),
        });
      }
    });
  }

  return out;
}
