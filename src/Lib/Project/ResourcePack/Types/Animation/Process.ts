import * as internal from "../../../../Internal/ResourcePack/Animation";
import { Json } from "../../../../Internal/Json";
import { Molang, Using } from "bc-minecraft-molang";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { Animation } from "./Animation";
import { Map } from "../../../../Types/Map/Map";
import { Types } from "bc-minecraft-bedrock-types";
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
      const item: Animation = {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: Molang.MolangSet.harvest(anim),
        documentation: Documentation.getDoc(doc, () => `RP Animation: '${id}', loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`),
        particles: Using.empty(),
        sounds: Using.empty(),
      };

      if (anim.particle_effects) Map.forEach(anim.particle_effects, (value, key) => processEffect(value, item.particles.using));
      if (anim.sound_effects) Map.forEach(anim.sound_effects, (value, key) => processEffect(value, item.sounds.using));

      out.push(item);
    }
  }

  return out;
}

type effect_carrier = { effect?: string }

function processEffect(item: effect_carrier | effect_carrier[], receiver: string[]): void {
  const process = (item: effect_carrier) => { if (item.effect) receiver.push(item.effect); };

  if (Array.isArray(item)) {
    item.forEach(process);
  }
  else {
    process(item);
  }
}