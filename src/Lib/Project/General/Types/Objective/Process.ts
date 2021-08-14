import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { GeneralInfo } from "../GeneralInfo";

export function Process(command: Command, uri: string): GeneralInfo | undefined {
  if (command.parameters.length < 3) {
    return;
  }

  let Mode = command.parameters[1];

  switch (Mode.text) {
    case "players":
      return CheckPlayer(command, uri);

    case "objectives":
      return CheckObjective(command, uri);
  }

  return undefined;
}

/**
 *
 * @param Com
 * @param Comment
 * @returns
 */
function CheckObjective(Com: Command, uri: string): GeneralInfo | undefined {
  let ObjectiveMode = Com.parameters[2];

  if (Com.parameters.length < 4) {
    return;
  }

  if (ObjectiveMode.text === "add") {
    const ID = Com.parameters[3];
    const Type = Com.parameters[4];
    let Doc = `The objective: ${ID.text}: ${Type.text}`;

    if (Com.parameters.length > 5) {
      Doc += " " + Com.parameters[5].text.replace(/"/g, "");
    }

    return GeneralInfo.create(ID.text, Types.Location.create(uri, ID.offset), Doc);
  }

  return undefined;
}

function CheckPlayer(Com: Command, uri: string): GeneralInfo | undefined {
  if (Com.parameters.length > 3) {
    const Selector = Com.parameters[3];

    if (!Selector.text.startsWith("@")) {
      return GeneralInfo.create(Selector.text, Types.Location.create(uri, Selector.offset), "The fake player: " + Selector.text);
    }
  }

  return undefined;
}
