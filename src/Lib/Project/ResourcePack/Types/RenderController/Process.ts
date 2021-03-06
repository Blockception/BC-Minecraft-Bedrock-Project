import * as internal from "../../../../Internal/ResourcePack/RenderController";
import { Json } from "../../../../Internal/Json";
import { Molang } from "bc-minecraft-molang";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { RenderController } from "./RenderController";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../../Types/Documentation/Documentation";

/** */
export function Process(doc: TextDocument): RenderController[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.RenderControllers>(doc);

  if (!internal.RenderControllers.is(imp)) return undefined;

  const out: RenderController[] = [];
  const container = imp.render_controllers;
  const keys = Object.getOwnPropertyNames(container);

  for (var I = 0; I < keys.length; I++) {
    const id = keys[I];
    const controller = container[id];

    const item: RenderController = {
      id: id,
      location: Types.Location.create(uri, content.indexOf(id)),
      molang: Molang.MolangFullSet.harvest(controller),
      documentation: Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
    };

    out.push(item);
}

return out;
}
