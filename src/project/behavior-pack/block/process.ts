import { Block } from "./Block";
import { Json } from "../../../internal";
import { Molang } from "bc-minecraft-molang";
import { Documentation, SMap, TextDocument } from "../../../types";
import { Types } from "bc-minecraft-bedrock-types";

import * as Internal from "../../../internal/behavior-pack";
import { BlockState } from "./BlockState";

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
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: Molang.MolangSet.harvest(container),
    states: [],
    documentation: Documentation.getDoc(doc, () => `BP Block: ${id}`),
  };

  const props = container.description.properties;
  if (props)
    SMap.forEach(props, (values, prop) => {
      const s = BlockState.create(prop, values);

      if (s) out.states.push(s);
    });

  return out;
}
