import * as Internal from "../../../Internal/ResourcePack/RenderController";
import { Documentation } from "../../../Types/Documentation";
import { Molang } from "bc-minecraft-molang";
import { RenderController } from "./RenderController";
import { TextDocument } from "../../../Types/TextDocument";
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
      molang: Molang.MolangFullSet.harvest(controller),
      documentation: Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
    };

    out.push(item);
  }

  return out;
}
