import * as internal from "../../../internal/resource-pack/SoundDefinitions";
import { Json } from "../../../internal/json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../types/TextDocument";
import { Sound } from "./sound";
import { Documentation } from "../../../types/Documentation";
import { SMap } from "../../../types";

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
