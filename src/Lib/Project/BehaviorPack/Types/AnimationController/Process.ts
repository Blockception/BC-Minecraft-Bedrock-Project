import * as internal from "../../../../Internal/BehaviorPack/AnimationController";
import { Json } from "../../../../Internal/Json";
import { Conditional } from "../../../../Internal/Types/Conditional";
import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/Defined Using/DefinedUsing";
import { Using } from "../../../../Types/Defined Using/include";
import { Documentation } from "../../../../Types/Documentated/Documentated";
import { Location } from "../../../../Types/Location/Location";
import { Map } from "../../../../Types/Map/Map";
import { TextDocument } from "../../../../Types/TextDocument/TextDocument";
import { AnimationController } from "./include";

/**
 *
 * @param doc
 * @returns
 */
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
        location: Location.create(uri, content.indexOf(id)),
        animations: DefinedUsing.empty(),
        molang: MolangSet.harvest(controller),
        documentation: Documentation.getDoc(doc, () => `BP Animation Controller: ${id}`),
      };

      Map.forEach(controller.states, (state) => getAnimations(state, item.animations));

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
  if (state.animations) Conditional.forEach(state.animations, (value, key) => receiver.using.push(key));
}
