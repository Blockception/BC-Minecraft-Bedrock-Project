import * as internal from "../../../../Internal/ResourcePack/SoundDefinitions";
import { Json } from "../../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Sound } from "./Sound";
import { Documentation } from "../../../../Types/Documentation/Documentation";
import { Map } from "../../../../Types/Map/Map";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Sound[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.SoundDefinitions>(content);

  if (!internal.SoundDefinitions.is(imp)) return undefined;

  const container = imp.sound_definitions;
  const out: Sound[] = [];

  Map.forEach(container, (value, key) => {
    out.push({
      id: key,
      location: Types.Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Sound: ${key} with ${value.sounds.length} sounds`),
    });
  });

  return out;
}
