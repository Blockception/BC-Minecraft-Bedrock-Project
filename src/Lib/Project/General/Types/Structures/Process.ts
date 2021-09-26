import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { GeneralInfo } from "../GeneralInfo";

export function Process(command: Command, uri: string): GeneralInfo | undefined {
  //tag <selector> add <tag>
  if (command.parameters[1]?.text !== "save") return undefined;

  const structure = command.parameters[2];

  return GeneralInfo.create(structure.text, Types.Location.create(uri, structure.offset), "The mcstructure: " + structure.text);
}
