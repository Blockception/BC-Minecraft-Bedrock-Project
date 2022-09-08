import { Command } from "bc-minecraft-bedrock-command";
import { TextDocument } from "../../../Types/TextDocument";
import { GeneralCollection } from "../../General";
import * as Tag from "../Tag/Process";
import * as Objective from "../Objective/Process";
import * as TickingArea from "../TickingArea/Process";
import * as Structure from "../Structures/Process";
import * as Internal from "../../../../Internal";
import { SMap } from "../../../Types/SMap";
import { Json } from "../../../../Internal/Json";

/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
export function ProcessMcFunction(doc: TextDocument, receiver: GeneralCollection): void {
  const text = doc.getText();
  const lines = text.split("\n");

  for (var I = 0; I < lines.length; I++) {
    ProcessCommand(lines[I].trim(), doc, receiver);
  }
}

/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
export function ProcessAnimationCommands(doc: TextDocument, receiver: GeneralCollection): void {
  const imp = Json.To<Internal.BehaviorPack.Animations>(doc);

  if (!Internal.BehaviorPack.Animations.is(imp)) return;

  //For each animation
  SMap.forEach(imp.animations, (anim) => {
    //For each timeline object
    SMap.forEach(anim.timeline, (time) => {
      if (typeof time === "string") {
        InternalJsonValue(time, doc, receiver);
      } else {
        time.forEach((t) => InternalJsonValue(t, doc, receiver));
      }
    });
  });
}

/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
export function ProcessAnimationControllerCommands(doc: TextDocument, receiver: GeneralCollection): void {
  const imp = Json.To<Internal.BehaviorPack.AnimationControllers>(doc);

  if (!Internal.BehaviorPack.AnimationControllers.is(imp)) return;

  //for each controller
  SMap.forEach(imp.animation_controllers, (anim) => {
    //for each state
    SMap.forEach(anim.states, (state) => {
      state.on_entry?.forEach((p) => InternalJsonValue(p, doc, receiver));
      state.on_exit?.forEach((p) => InternalJsonValue(p, doc, receiver));
    });
  });
}

function InternalJsonValue(prop: string, doc: TextDocument, receiver: GeneralCollection) {
  if (prop.startsWith("/")) {
    const offset = doc.getText().indexOf(prop);

    ProcessCommandAt(prop, offset, doc, receiver);
  }
}

/**
 *
 * @param line
 * @param doc
 * @param edu
 * @param receiver
 * @returns
 */
export function ProcessCommand(line: string, doc: TextDocument, receiver: GeneralCollection): void {
  if (line.startsWith("#") || line.length < 3) return;

  const offset = doc.getText().indexOf(line);

  return ProcessCommandAt(line, offset, doc, receiver);
}

/**
 *
 * @param line
 * @param offset
 * @param doc
 * @param edu
 * @param receiver
 * @returns
 */
export function ProcessCommandAt(line: string, offset: number, doc: TextDocument, receiver: GeneralCollection): void {
  if (line.startsWith("#")) return;
  if (line.startsWith("/")) line = line.substring(1);

  let command: Command | undefined = Command.parse(line, offset);

  while (command) {
    if (command.parameters.length === 0) break;

    switch (command != undefined && command.parameters[0].text) {
      case "tag":
        receiver.tags.set(Tag.Process(command, doc));
        break;

      case "scoreboard":
        Objective.Process(command, doc, receiver);
        break;

      case "structure":
        receiver.structures.set(Structure.Process(command, doc));
        break;

      case "tickingarea":
        receiver.tickingAreas.set(TickingArea.Process(command, doc));
        break;
    }

    command = command.getSubCommand(true);
  }
}
