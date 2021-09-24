import * as internal from "../../../../Internal/ResourcePack/AnimationController";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "bc-minecraft-molang";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { AnimationController } from "./AnimationController";
import { Map } from "../../../../Types/Map/Map";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../../Types/Documentation/Documentation";

/** */
export function Process(doc: TextDocument): AnimationController[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.AnimationControllers>(content);

  if (!internal.AnimationControllers.is(imp)) return undefined;

  const out: AnimationController[] = [];
  const container = imp.animation_controllers;
  const keys = Object.getOwnPropertyNames(container);

  for (var I = 0; I < keys.length; I++) {
    const id = keys[I];
    const controller = container[id];

    if (internal.AnimationController.is(controller)) {
      const item: AnimationController = {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: MolangSet.harvest(controller),
        documentation: Documentation.getDoc(doc, () => `RP Animation Controller: \`${id}\``),
        animations: Using.empty(),
        particles: Using.empty(),
        sounds: Using.empty(),
      };

      Map.forEach(controller.states, (State) => {
        if (State.animations)
          Types.Conditional.forEach(State.animations, (reference, value) => {
            item.animations.using.push(reference);
          });

        if (State.particle_effects) harvest(State.particle_effects, item.particles);
        if (State.sound_effects) harvest(State.sound_effects, item.particles);
      });

      out.push(item);
    }
  }

  return out;
}

function harvest(data: { effect?: string }[], receiver: Using<string>) {
  data.forEach((e) => {
    if (e.effect) receiver.using.push(e.effect);
  });
}
