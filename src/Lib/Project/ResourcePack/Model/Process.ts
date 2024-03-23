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

  SMap.forEach<any>(imp, (value, key) => {
    if (!key.startsWith("geometry.")) {
      return;
    }
    out.push(
      ...createModel({
        id: key,
        location: Types.Location.create(uri, content.indexOf(key)),
        documentation: Documentation.getDoc(doc, () => `Model: ${key}`),
      })
    );
  });

  const modern = imp["minecraft:geometry"];
  if (Array.isArray(modern)) {
    modern
      .filter((m): m is internal.ModelModernSpec => internal.ModelModernSpec.is(m))
      .forEach((model) => {
        out.push(
          ...createModel({
            id: model.description.identifier,
            location: Types.Location.create(uri, content.indexOf(model.description.identifier)),
            documentation: Documentation.getDoc(doc, () => `Model: ${model.description.identifier}`),
          })
        );
      });
  }

  return out;
}

function createModel(current: Model): Array<Model> {
  // Might be armor definition, thus split it and return
  if (current.id.includes(":")) {
    const keys = current.id.split(":");

    return keys.map((key) => {
      return {
        ...current,
        id: key,
      };
    });
  }

  return [current];
}
