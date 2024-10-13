import * as Internal from "../../../internal/resource-pack/AnimationController";
import { Molang } from "bc-minecraft-molang";
import { TextDocument } from "../../../types";
import { AnimationController } from "./animation-controller";
import { SMap } from "../../../types";
import { Using } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types";

/** */
export function Process(doc: TextDocument): AnimationController[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.AnimationControllers.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const out: AnimationController[] = [];
  const container = imp.animation_controllers;
  const keys = Object.getOwnPropertyNames(container);

  for (let I = 0; I < keys.length; I++) {
    const id = keys[I];
    const controller = container[id];

    if (Internal.AnimationController.is(controller)) {
      const item: AnimationController = {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: Molang.MolangSet.harvest(controller),
        documentation: Documentation.getDoc(doc, () => `RP Animation Controller: '${id}'`),
        animations: Using.empty(),
        particles: Using.empty(),
        sounds: Using.empty(),
      };

      SMap.forEach(controller.states, (State) => {
        if (State.animations)
          Types.Conditional.forEach(State.animations, (reference) => item.animations.using.push(reference));

        if (State.particle_effects) harvest(State.particle_effects, item.particles);
        if (State.sound_effects) harvest(State.sound_effects, item.sounds);
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
