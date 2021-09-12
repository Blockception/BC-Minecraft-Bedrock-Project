import * as internal from "../../../../Internal/ResourcePack/RenderController";
import { Json } from "../../../../Internal/Json";
import { MolangFullSet } from "../../../../Molang/MolangSet";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { RenderController } from "./include";
import { Documentation } from "../../../../Types/include";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export function Process(doc: TextDocument): RenderController[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.RenderControllers>(content);

  if (!internal.RenderControllers.is(imp)) return undefined;

  const out: RenderController[] = [];
  const container = imp.render_controllers;
  const keys = Object.getOwnPropertyNames(container);

  for (var I = 0; I < keys.length; I++) {
    const id = keys[I];
    const controller = container[id];

    if (internal.RenderControllers.is(controller)) {
      const item: RenderController = {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: MolangFullSet.harvest(controller),
        documentation: Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
      };

      out.push(item);
    }
  }

  return out;
}
