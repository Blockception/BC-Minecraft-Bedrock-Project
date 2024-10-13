import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../Internal/BehaviorPack";
import { Animation } from "./Animation";
import { Molang } from "bc-minecraft-molang";
import { Documentation, TextDocument } from "../../../Types";
import { Json } from "../../../Internal";

/** */
export function Process(doc: TextDocument): Animation[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Animations>(doc);

  if (!Internal.Animations.is(imp)) return undefined;

  const out: Animation[] = [];
  const container = imp.animations;
  const keys = Object.getOwnPropertyNames(container);

  for (let I = 0; I < keys.length; I++) {
    const id = keys[I];
    const anim = container[id];

    if (Internal.Animation.is(anim)) {
      out.push({
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: Molang.MolangSet.harvest(anim),
        documentation: Documentation.getDoc(
          doc,
          () => `BP Animation: \`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`
        ),
      });
    }
  }

  return out;
}
