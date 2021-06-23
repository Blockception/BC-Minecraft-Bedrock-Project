import * as internal from "../../../../Internal/BehaviorPack/Entity";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Location } from "../../../../Types/Location";
import { Map } from "../../../../Types/Map";
import { TextDocument } from "../../../../Types/TextDocument";
import { Entity } from "./include";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Entity | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Entity>(content);

  if (!internal.Entity.is(imp)) return undefined;

  const container = imp["minecraf:entity"];
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
