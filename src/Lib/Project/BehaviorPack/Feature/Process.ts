import * as internal from "../../../Internal/BehaviorPack/Feature";
import { Json } from "../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../Types/Documentation";
import { TextDocument } from "../../../Types/TextDocument";
import { Feature } from "./Feature";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Feature | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Feature>(doc);

  if (!internal.Feature.is(imp)) return undefined;

  const key = Object.keys(imp).find((x) => !x.startsWith("format_version"));
  if (key === undefined) return;
  const container = imp[key as keyof internal.Feature];
  if (container === undefined || typeof container === "string") return;

  const id = container.description.identifier;

  const out: Feature = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Feature: ${id}`),
  };

  return out;
}
