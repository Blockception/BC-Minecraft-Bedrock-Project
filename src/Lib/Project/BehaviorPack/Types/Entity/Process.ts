import * as internal from "../../../../Internal/BehaviorPack/Entity";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/Defined Using/DefinedUsing";
import { Types } from "bc-minecraft-bedrock-types";
import { Map } from "../../../../Types/Map/Map";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Entity } from "./include";
import { Documentation } from "../../../../Types/Documentated/Documentated";

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

  const out: Entity = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `BP Entity: ${id}`),
    animations: DefinedUsing.empty(),
    events: [],
    groups: [],
    molang: MolangSet.harvest(container),
  };

  if (container.component_groups) Map.forEach(container.component_groups, (group, name) => out.groups.push(name));
  if (container.events) Map.forEach(container.events, (event, name) => out.events.push(name));
  if (container.description.animations) {
    Map.forEach(container.description.animations, (anim, name) => {
      out.animations.defined.push(name);
      out.animations.using.push(anim);
    });
  }

  return out;
}
