import * as internal from "../../../../Internal/ResourcePack/SoundDefinitions";
import { Json } from "../../../../Internal/Json";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Sound } from "./include";
import { Documentation } from "../../../../Types/Documentated/include";
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
      location: Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Sound: ${key} with ${value.sounds.length} sounds`),
    });
  });

  return out;
}
