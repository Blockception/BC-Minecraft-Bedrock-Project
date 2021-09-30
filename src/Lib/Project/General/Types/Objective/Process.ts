import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { GeneralCollection } from "../../General";
import { GeneralInfo } from "../GeneralInfo";

export function Process(command: Command, uri: string, receiver: GeneralCollection): void {
  if (command.parameters.length < 3) {
    return;
  }

  let Mode = command.parameters[1];

  switch (Mode.text) {
    case "players":
      receiver.fakeEntities.set(CheckPlayer(command, uri));
      return;

    case "objectives":
      receiver.objectives.set(CheckObjective(command, uri));
      return;
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

      //TODO comments to documentation?
    return GeneralInfo.create(ID.text, Types.Location.create(uri, ID.offset), Doc);
  }

  return undefined;
}

function CheckPlayer(Com: Command, uri: string): GeneralInfo | undefined {
  if (Com.parameters.length > 3) {
    const Selector = Com.parameters[3];

    if (!Selector.text.startsWith("@") && Selector.text !== "*") {
      //TODO comments to documentation?
      return GeneralInfo.create(Selector.text, Types.Location.create(uri, Selector.offset), "The fake player: " + Selector.text);
    }
  }

  return undefined;
}
