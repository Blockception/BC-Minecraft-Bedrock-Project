import * as internal from "../../../../Internal/ResourcePack/Animation";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { Location } from "../../../../Types/Location";
import { TextDocument } from "../../../../Types/TextDocument";
import { Animation } from "./include";
import { Using } from "../../../../Types/Used";
import { Map } from "../../../../Types/Map";

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
        documentation: `RP Animation\`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`,
        particles: Using.empty(),
        sounds: Using.empty(),
      };

      if (anim.particle_effects) harvest(anim.particle_effects, item.particles);
      if (anim.sound_effects) harvest(anim.sound_effects, item.sounds);

      out.push(item);
    }
  }

  return out;
}

function harvest(data: Map<{ effect?: string } | { effect?: string }[]>, receiver: Using<string>) {
  Map.forEach(data, (value) => {
    if (Array.isArray(value)) {
      value.forEach((e) => {
        if (e.effect) receiver.using.push(e.effect);
      });
    } else {
      if (value.effect) receiver.using.push(value.effect);
    }
  });
}
