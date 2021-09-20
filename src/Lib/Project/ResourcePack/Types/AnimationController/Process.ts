import * as internal from "../../../../Internal/ResourcePack/AnimationController";
import { Json } from "../../../../Internal/Json";
import { MolangSet } from "../../../../Molang/MolangSet";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { AnimationController } from "./AnimationController";
import { Map } from "../../../../Types/Map/Map";
import { Conditional } from "../../../../Internal/Types/Conditional";
import { Using } from "../../../../Types/Defined Using/include";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../../Types/Documentated/Documentated";

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
          Conditional.forEach(State.animations, (value, key) => {
            item.animations.using.push(key);
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
