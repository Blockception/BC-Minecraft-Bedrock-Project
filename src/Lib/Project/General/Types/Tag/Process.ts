import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { GeneralInfo } from "../GeneralInfo";

export function Process(command: Command, uri: string): GeneralInfo | undefined {
  //tag <selector> add <tag>
  if (command.parameters[2]?.text !== "add") return undefined;

  const tag = command.parameters[3];

  return GeneralInfo.create(tag.text, Types.Location.create(uri, tag.offset), "The tag: " + tag.text);
}
