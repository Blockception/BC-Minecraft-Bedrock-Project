import { Types } from "bc-minecraft-bedrock-types";
import { DefinedUsing, Molang, Using } from "bc-minecraft-molang";
import * as internal from "../../../internal/behavior-pack/animation-controller";
import { Json } from "../../../internal/json";
import { Documentation } from "../../../types/Documentation";
import { SMap } from "../../../types";
import { TextDocument } from "../../../types/TextDocument";
import { AnimationController } from "./animation-controller";

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

  for (let I = 0; I < keys.length; I++) {
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
  if (state.animations) Types.Conditional.forEach(state.animations, (reference) => receiver.using.push(reference));
}
