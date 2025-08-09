import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/behavior-pack/biome";
import { Json } from "../../../internal/json";
import { Documentation, TextDocument } from "../../../types";
import { Biome } from "./biome";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Biome | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const biome = Json.To<Internal.Biome>(doc);

  if (!Internal.Biome.is(biome)) return undefined;

  const id = biome["minecraft:biome"].description.identifier;

  const out: Biome = {
    id: id,
    documentation: Documentation.getDoc(doc, () => `Biome: ${id}`),
    location: Types.Location.create(uri, content.indexOf(id)),
    tags: biome["minecraft:biome"].components["minecraft:tags"] || [],
  };

  return out;
}
