import * as internal from "../../../../Internal/BehaviorPack/Animation";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Animation } from "./include";

/** */
export function Process(doc: TextDocument): Animation[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Animations>(content);

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
        location: Location.create(uri, content.indexOf(id)),
        molang: MolangSet.harvest(anim),
        documentation: `BP Animation: \`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`,
      });
    }
  }

  return out;
}
