import { Command } from "bc-minecraft-bedrock-command";
import { Range, TextDocument } from "../../../../Types/include";
import { McFunction } from "../../../BehaviorPack/include";
import { GeneralCollection } from "../../General";

export function Process(command: Command, doc: TextDocument, receiver: GeneralCollection): void {
  //tag <selector> add <tag>
  if (command.parameters[2]?.text !== "add") return;

  const tag = command.parameters[3];

  let Comment = McFunction.GetComment(doc.getText(Range.createR(0, 0, 0, Number.MAX_SAFE_INTEGER)));

  if (Comment === "") {
    Comment = "tag definition: " + tag.text;
  }

  receiver.tags.set({
    id: tag.text,
    location: { uri: doc.uri, position: tag.offset },
    documentation: Comment,
  });
}
