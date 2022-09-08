import * as internal from "../../../../Internal/ResourcePack/Particle";
import { Json } from "../../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../Types/TextDocument";
import { Particle } from "./Particle";
import { Documentation } from "../../../../Types/Documentation";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Particle | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Particle>(doc);

  if (!internal.Particle.is(imp)) return undefined;

  const container = imp.particle_effect;
  const id = container.description.identifier;
  const out: Particle = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Particle: ${id}`),
  };

  return out;
}
