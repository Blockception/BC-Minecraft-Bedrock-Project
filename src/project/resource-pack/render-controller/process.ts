import * as Internal from "../../../internal/resource-pack/render-controller";
import { Documentation } from "../../../types";
import { Molang } from "bc-minecraft-molang";
import { RenderController } from "./render-controller";
import { TextDocument } from "../../../types";
import { Types } from "bc-minecraft-bedrock-types";

/** */
export function Process(doc: TextDocument): RenderController[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.RenderControllers.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();

  const out: RenderController[] = [];
  const container = imp.render_controllers;
  const keys = Object.getOwnPropertyNames(container);

  for (let I = 0; I < keys.length; I++) {
    const id = keys[I];
    const controller = container[id];

    const item: RenderController = {
      id: id,
      location: Types.Location.create(uri, content.indexOf(id)),
      molang: harvestMolang(content, controller),
      documentation: Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
    };

    out.push(item);
  }

  return out;
}
