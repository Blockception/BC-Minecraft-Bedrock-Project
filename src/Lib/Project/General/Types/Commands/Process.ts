import { Command } from "bc-minecraft-bedrock-command";
import { TextDocument } from "../../../../Types/include";
import { GeneralCollection } from "../../General";
import * as Tag from "../Tag/Process";
import * as Objective from "../Objective/Process";
import * as TickingArea from "../TickingArea/Process";

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
    ProcessCommand(lines[I], doc, receiver);
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
  if (line.startsWith("#")) return;

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
  let command: Command | undefined = Command.parse(line, offset);

  while (command) {
    if (command.parameters.length === 0) break;

    switch (command != undefined && command.parameters[0].text) {
      case "tag":
        receiver.tags.set(Tag.Process(command, doc.uri));
        break;

      case "scoreboard":
        Objective.Process(command, doc.uri, receiver);
        break;

      case "tickingarea":
        receiver.tickingAreas.set(TickingArea.Process(command, doc.uri));
        break;
    }

    command = command.getSubCommand(true);
  }
}
