import { Command } from "bc-minecraft-bedrock-command";
import { TextDocument } from "../../../../Types/include";
import { GeneralCollection } from "../../General";

export function Processcommand(line: string, doc: TextDocument, receiver: GeneralCollection): void {
  if (line.startsWith("#")) return;

  const offset = doc.getText().indexOf(line);
  let command: Command | undefined = Command.parse(line, offset);

  while (command) {
    if (command.parameters.length === 0) break;

    switch (command.parameters[0].text) {
      case "tag":
        ProcessTagcommand(command, document);
        break;

      case "scoreboard":
        ProcessScoreboardcommand(command, document);
        break;

      case "tickingarea":
        ProcessTickingAreacommand(command);
        break;
    }

    command = GetSubcommand(command, document.getConfiguration().settings.Education.Enable);
  }
}
