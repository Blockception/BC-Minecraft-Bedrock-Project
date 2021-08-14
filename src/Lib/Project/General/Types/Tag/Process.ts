import { Command } from "bc-minecraft-bedrock-command";
import { GeneralInfo } from "../GeneralInfo";
import { Location } from "../../../../Types/include";

export function Process(command: Command, uri: string): GeneralInfo | undefined {
  //tag <selector> add <tag>
  if (command.parameters[2]?.text !== "add") return undefined;

  const tag = command.parameters[3];

  return GeneralInfo.create(tag.text, Location.create(uri, tag.offset), "The tag: " + tag.text);
}
