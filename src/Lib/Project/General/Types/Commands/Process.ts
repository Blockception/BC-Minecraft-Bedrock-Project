import { Command } from "bc-minecraft-bedrock-command";
import { TextDocument } from "../../../../Types/include";
import { GeneralCollection } from "../../General";
import * as Tag from "../Tag/Process";
import * as Objective from "../Objective/Process";
import * as TickingArea from "../TickingArea/Process";

export function ProcessCommand(line: string, doc: TextDocument, edu: boolean, receiver: GeneralCollection): void {
  if (line.startsWith("#")) return;

  const offset = doc.getText().indexOf(line);
  let command: Command | undefined = Command.parse(line, offset);

  while (command) {
    if (command.parameters.length === 0) break;

    switch (command != undefined && command.parameters[0].text) {
      case "tag":
        Tag.Process(command, doc.uri);
        break;

      case "scoreboard":
        Objective.Process(command, doc.uri);
        break;

      case "tickingarea":
        TickingArea.Process(command, doc.uri);
        break;
    }

    command = command.getSubCommand(edu);
  }
}
