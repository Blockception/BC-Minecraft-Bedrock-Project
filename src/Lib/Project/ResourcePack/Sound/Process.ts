import * as internal from "../../../Internal/ResourcePack/SoundDefinitions";
import { Json } from "../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../Types/TextDocument";
import { Sound } from "./Sound";
import { Documentation } from "../../../Types/Documentation";
import { SMap } from "../../../Types/SMap";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Sound[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.SoundDefinitions>(doc);

  if (!internal.SoundDefinitions.is(imp)) return undefined;

  const container = imp.sound_definitions;
  const out: Sound[] = [];

  SMap.forEach(container, (value, key) => {
    out.push({
      id: key,
      location: Types.Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Sound: ${key} with ${value.sounds?.length ?? 0} sounds`),
    });
  });

  return out;
}
