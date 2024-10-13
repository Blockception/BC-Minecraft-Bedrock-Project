import * as Internal from "../../../internal/resource-pack";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../types/TextDocument";
import { Particle } from "./particle";
import { Documentation } from "../../../types/Documentation";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Particle | undefined {
  const imp = TextDocument.toObject(doc, Internal.Particle.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const container = imp.particle_effect;
  const id = container.description.identifier;
  const out: Particle = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Particle: ${id}`),
  };

  return out;
}
