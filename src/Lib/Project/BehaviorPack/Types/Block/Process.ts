import * as internal from "../../../../Internal/BehaviorPack/Block";
import { Json } from "../../../../Internal/Json";
import { Conditional } from "../../../../Internal/Types/Conditional";
import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/DefinedUsing";
import { Using } from "../../../../Types/include";
import { Location } from "../../../../Types/Location";
import { Map } from "../../../../Types/Map";
import { TextDocument } from "../../../../Types/TextDocument";
import { BlockState } from "./Block";
import { Block } from "./include";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Block | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Block>(content);

  if (!internal.Block.is(imp)) return undefined;

  const container = imp["minecraft:block"];
  const id = container.description.identifier;

  const out: Block = {
    id: id,
    location: Location.create(uri, content.indexOf(id)),
    molang: MolangSet.harvest(container),
    states: [],
    documentation: `BP Block: ${id}`,
  };

  const props = container.description.properties;
  if (props)
    Map.forEach(props, (values, prop) => {
      const s = BlockState.create(prop, values);

      if (s) out.states.push(s);
    });

  return out;
}
