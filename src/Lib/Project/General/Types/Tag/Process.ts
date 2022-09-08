import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from '../../../../Types';
import { Documentation } from '../../../../Types/Documentation';
import { GeneralInfo } from "../GeneralInfo";

export function Process(command: Command, doc: TextDocument): GeneralInfo | undefined {
  //tag <selector> add <tag>
  if (command.parameters[2]?.text !== "add") return undefined;

  const tag = command.parameters[3];

  return GeneralInfo.create(
    tag.text,
    Types.Location.create(doc.uri, tag.offset),
    Documentation.getDoc(doc, () => `The tag: ${tag.text}`, command.parameters[0].offset)
  );
}
