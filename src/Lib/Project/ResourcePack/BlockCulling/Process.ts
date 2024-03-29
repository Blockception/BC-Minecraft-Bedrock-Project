import { BlockCulling } from './Culling';
import { Documentation } from "../../../Types/Documentation";
import { Json } from "../../../Internal";
import { TextDocument } from "../../../Types/TextDocument";
import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../Internal/ResourcePack/BlockCulling";

export function Process(doc: TextDocument): BlockCulling[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.BlockCulling>(doc);
  if (!Internal.BlockCulling.is(imp)) return undefined;

  const id = imp['minecraft:block_culling_rules'].description.identifier;
  if (typeof id !== "string") return undefined;

  const result: BlockCulling = {
    id: id,
    affected_bones: [],
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Block culling rule: ${id}`),
  };

  // Gather all the bones
  const rules = imp["minecraft:block_culling_rules"].rules;
  if (Array.isArray(rules)) {
    for (let I = 0; I < rules.length; I++) {
      const item = rules[I];
      const bone = item?.geometry_part?.bone;
      if (typeof bone === "string") {
        result.affected_bones.push(bone);
      }
    }
  }

  return [result];
}