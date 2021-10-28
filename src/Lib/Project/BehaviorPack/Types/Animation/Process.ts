import { Types } from "bc-minecraft-bedrock-types";
import * as internal from "../../../../Internal/BehaviorPack/Animation";
import { Json } from "../../../../Internal/Json";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Animation } from "./Animation";
import { Molang } from "bc-minecraft-molang";
import { Documentation } from "../../../../Types/Documentation/Documentation";

/** */
export function Process(doc: TextDocument): Animation[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Animations>(doc);

  if (!internal.Animations.is(imp)) return undefined;

  const out: Animation[] = [];
  const container = imp.animations;
  const keys = Object.getOwnPropertyNames(container);

  for (var I = 0; I < keys.length; I++) {
    const id = keys[I];
    const anim = container[id];

    if (internal.Animation.is(anim)) {
      out.push({
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: Molang.MolangSet.harvest(anim),
        documentation: Documentation.getDoc(doc, () => `BP Animation: \`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`),
      });
    }
  }

  return out;
}
