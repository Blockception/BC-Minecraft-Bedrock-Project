import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, Molang, Using } from "bc-minecraft-molang";
import * as internal from "../../../Internal/BehaviorPack/AnimationController";
import { Json } from "../../../Internal/Json";
import { Documentation } from "../../../Types/Documentation";
import { SMap } from "../../../Types/SMap";
import { TextDocument } from "../../../Types/TextDocument";
import { AnimationController } from "./AnimationController";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): AnimationController[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.AnimationControllers>(doc);

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
        animations: DefinedUsing.empty(),
        molang: Molang.MolangSet.harvest(controller),
        documentation: Documentation.getDoc(doc, () => `BP Animation Controller: ${id}`),
      };

      SMap.forEach(controller.states, (state) => getAnimations(state, item.animations));

      out.push(item);
    }
  }

  return out;
}

/**
 *
 * @param state
 * @param receiver
 */
function getAnimations(state: internal.State, receiver: Using<string>): void {
  if (state.animations) Types.Conditional.forEach(state.animations, (reference, value) => receiver.using.push(reference));
}
