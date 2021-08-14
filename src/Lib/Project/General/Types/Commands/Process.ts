import { Command } from "bc-minecraft-bedrock-command";
import { TextDocument } from "../../../../Types/include";
import { GeneralCollection } from "../../General";

export function ProcessCommand(line: string, doc: TextDocument, edu: boolean, receiver: GeneralCollection): void {
  if (line.startsWith("#")) return;

  const offset = doc.getText().indexOf(line);
  let command: Command | undefined = Command.parse(line, offset);

  while (command) {
    if (command.parameters.length === 0) break;

    switch (command != undefined && command.parameters[0].text) {
      case "tag":
        ProcessTagCommand(command, doc);
        break;

      case "scoreboard":
        ProcessScoreboardCommand(command, doc);
        break;

      case "tickingarea":
        ProcessTickingAreaCommand(command);
        break;
    }

    command = command.getSubCommand(edu);
  }
}
