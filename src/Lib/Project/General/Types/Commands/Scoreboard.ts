import { Command } from "bc-minecraft-bedrock-command";
import { TextDocument } from "../../../../Types/include";

/**
 *
 * @param Com
 * @param doc
 * @returns
 */
export function ProcessScoreboardCommand(Com: Command, doc: TextDocument): void {
  if (Com.parameters.length < 3) {
    return;
  }

  let Comment = GetComment(doc);
  let Mode = Com.parameters[1];

  switch (Mode.text) {
    case "players":
      return CheckPlayer(Com, Comment);

    case "objectives":
      return CheckObjective(Com, Comment);
  }
}

/**
 *
 * @param Com
 * @param Comment
 * @returns
 */
function CheckObjective(Com: Command, Comment: string): void {
  let ObjectiveMode = Com.parameters[2];

  if (Com.parameters.length < 4) {
    return;
  }

  if (ObjectiveMode.text === "add") {
    let obj = new Objective();

    let ID = Com.parameters[3];
    let Type = Com.parameters[4];
    obj.Identifier = ID.text;
    obj.Type = Type.text;
    obj.Location = ID.location;

    if (Comment === "") {
      obj.Documentation.value = "The objective: " + ID.text + " " + Type.text;

      if (Com.parameters.length > 5) {
        obj.Documentation.value += " " + Com.parameters[5].text.replace(/"/g, "");
      }
    } else {
      obj.Documentation.value = Comment;
    }

    Database.ProjectData.General.Objectives.Set(obj);
  }
}

function CheckPlayer(Com: Command, Comment: string): void {
  if (Com.parameters.length > 3) {
    let Selector = Com.parameters[3];

    if (IsFakePlayer(Selector.text)) {
      let FE = new FakeEntity();

      FE.Identifier = Selector.text;
      FE.Location = Selector.location;

      if (Comment !== "") {
        FE.Documentation.value = "The fake player: " + FE.Identifier;
      } else {
        FE.Documentation.value = Comment;
      }

      Console.Info(`Found fake player: ${FE.Identifier}`);
      Database.ProjectData.General.FakeEntities.Set(FE);
    }
  }
}
