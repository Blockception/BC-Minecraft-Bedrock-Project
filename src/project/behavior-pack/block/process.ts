import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import { Documentation, SMap, TextDocument } from "../../../types";
import { Block } from "./block";
import { BlockState } from "./block-state";

import * as Internal from "../../../internal/behavior-pack";
import { harvestMolang } from "../../molang";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Block | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Block>(doc);

  if (!Internal.Block.is(imp)) return undefined;

  const container = imp["minecraft:block"];
  const id = container.description.identifier;

  const out: Block = {
    id: id,
    documentation: Documentation.getDoc(doc, () => `BP Block: ${id}`),
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: harvestMolang(content, container),
    states: [],
  };

  const props = container.description.properties;
  if (props)
    SMap.forEach(props, (values, prop) => {
      const s = BlockState.create(prop, values);

      if (s) out.states.push(s);
    });

  return out;
}
