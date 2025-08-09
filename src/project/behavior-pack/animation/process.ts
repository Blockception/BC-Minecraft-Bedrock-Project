import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/behavior-pack";
import { Documentation, SMap, TextDocument } from "../../../types";
import { harvestMolang } from "../../molang";
import { Animation } from "./animation";

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
      const events: string[] = [];

      SMap.forEach(anim.timeline, (keyframe) => {
        if (typeof keyframe == "string") keyframe = [keyframe];
        keyframe
          .filter((entry) => entry.startsWith("@s "))
          .map((entry) => entry.slice(3))
          .forEach((entry) => {
            if (!events.includes(entry)) events.push(entry);
          });
      });

      out.push({
        events: events,
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: harvestMolang(content, anim),
        documentation: Documentation.getDoc(
          doc,
          () => `BP Animation: \`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`
        ),
      });
    }
  }

  return out;
}
