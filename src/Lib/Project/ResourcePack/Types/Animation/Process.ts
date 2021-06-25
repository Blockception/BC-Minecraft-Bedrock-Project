import * as internal from "../../../../Internal/ResourcePack/Animation";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Location } from "../../../../Types/Location/Location";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Animation } from "./include";
import { Map } from "../../../../Types/Map/Map";
import { Using } from "../../../../Types/Defined Using/include";
import { Documentation } from "../../../../Types/Documentated/include";

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
      const item: Animation = {
        id: id,
        location: Location.create(uri, content.indexOf(id)),
        molang: MolangSet.harvest(anim),
        documentation: Documentation.getDoc(doc, () => `RP Animation\`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`),
        particles: Using.empty(),
        sounds: Using.empty(),
      };

      if (anim.particle_effects) Map.forEach(anim.particle_effects, (value, key) => item.particles.using.push(key));
      if (anim.sound_effects) Map.forEach(anim.sound_effects, (value, key) => item.sounds.using.push(key));

      out.push(item);
    }
  }

  return out;
}
