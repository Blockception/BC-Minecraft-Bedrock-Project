/**
 *
 * @param Com
 * @param doc
 * @returns
 */
export function ProcessTagCommand(Com: Command, doc: TextDocument): void {
  //tag <selector> add <tag>
  if (Com.parameters[2]?.text !== "add") return;

  let tag = Com.parameters[3];

  let Data = new Tag();
  Data.Identifier = tag.text;
  Data.Location = tag.location;

  let Comment = GetComment(doc.getLine(Com.Line));

  if (Comment !== "") {
    Data.Documentation.value = Comment;
  } else {
    Data.Documentation.value = "The tag: " + tag.text;
  }

  Console.Info("Found tag: " + tag.text);
  Database.ProjectData.General.Tag.Set(Data);
}
