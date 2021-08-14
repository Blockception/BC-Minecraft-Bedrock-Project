import * as internal from "../../../../Internal/ResourcePack/Particle";
import { Json } from "../../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Particle } from "./include";
import { Documentation } from "../../../../Types/Documentated/include";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Particle | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Particle>(content);

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
