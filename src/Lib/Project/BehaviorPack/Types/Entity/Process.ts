import * as internal from "../../../../Internal/BehaviorPack/Entity";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Location } from "../../../../Types/Location/Location";
import { Map } from "../../../../Types/Map/Map";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Block } from "../Block/include";
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

  return out;
}
