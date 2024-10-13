import * as Internal from "../../../internal/resource-pack/Animation";
import { Molang, Using } from "bc-minecraft-molang";
import { TextDocument } from "../../../types/TextDocument";
import { Animation } from "./Animation";
import { SMap } from "../../../types";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types/Documentation";

/** */
export function Process(doc: TextDocument): Animation[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.Animations.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const out: Animation[] = [];
  const container = imp.animations;
  const keys = Object.getOwnPropertyNames(container);

  for (let I = 0; I < keys.length; I++) {
    const id = keys[I];
    const anim = container[id];

    if (Internal.Animation.is(anim)) {
      const item: Animation = {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: Molang.MolangSet.harvest(anim),
        documentation: Documentation.getDoc(doc, () => `RP Animation: '${id}', loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`),
        particles: Using.empty(),
        sounds: Using.empty(),
      };

      if (anim.particle_effects) SMap.forEach(anim.particle_effects, (value) => processEffect(value, item.particles.using));
      if (anim.sound_effects) SMap.forEach(anim.sound_effects, (value) => processEffect(value, item.sounds.using));

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