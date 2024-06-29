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

  for (const [key, value] of Object.entries(imp)) {
    if (!key.startsWith("geometry.")) continue;
    if (!internal.ModelLegacySpec.is(value)) continue;

    out.push(
      createModel({
        id: key,
        location: Types.Location.create(uri, content.indexOf(key)),
        documentation: Documentation.getDoc(doc, () => `Model: ${key}`),
        bones: getBones(value),
      })
    );
  }

  const modern = imp["minecraft:geometry"];
  if (Array.isArray(modern)) {
    modern
      .filter((m): m is internal.ModelModernSpec => internal.ModelModernSpec.is(m))
      .forEach((model) => {
        out.push(
          createModel({
            id: model.description.identifier,
            location: Types.Location.create(uri, content.indexOf(model.description.identifier)),
            documentation: Documentation.getDoc(doc, () => `Model: ${model.description.identifier}`),
            bones: getBones(model),
          })
        );
      });
  }

  return out;
}

function getBones(model: Pick<internal.ModelLegacySpec | internal.ModelModernSpec, "bones">): string[] {
  const out: string[] = [];

  model.bones.forEach((bone) => {
    const name = bone.name;
    if (typeof name !== "string" || name === "") return;
    if (out.includes(bone.name)) return;

    out.push(bone.name);
  });

  return out;
}

function createModel(current: Model): Model {
  // Might be inheriting another geometry, thus split it and return
  const keys = current.id.includes(':geometry') ? current.id.split(":geometry")[0] : current.id;

  return {
    ...current,
    id: keys,
  };
}
