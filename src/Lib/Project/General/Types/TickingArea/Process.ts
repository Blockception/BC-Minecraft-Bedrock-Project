import { Command } from "bc-minecraft-bedrock-command";
import { GeneralInfo } from "../GeneralInfo";
import { Location } from "../../../../Types/include";

export function Process(Command: Command, uri : string): GeneralInfo | undefined {
  //tickingarea add
  if (Command.parameters[1]?.text !== "add") return;

  //tickingarea add circle
  if (Command.parameters[2]?.text === "circle") {
    return ProcessCircleCommand(Command, uri);

  return ProcessBoxCommand(Command, uri);
}

/**
 *
 * @param Command
 * @returns
 */
function ProcessCircleCommand(Command: Command, uri : string): GeneralInfo | undefined {
  //Tickingarea add circle <x> <y> <z> <r> [name]
  const parameters = Command.parameters;

  if (parameters.length < 7) return;

  const Area = `x: ${parameters[3].text}, y: ${parameters[4].text}, z: ${parameters[5].text}, radius: ${parameters[6].text}`;
  let Name = "";

  let Loc: Location;

  if (parameters.length > 7) {
    Name = parameters[7].text;
    Loc = Location.create(uri,parameters[7].offset);
  } else {
    Loc = Location.create(uri, parameters[3].offset);
  }

  return GeneralInfo.create(Name, Loc, `The circular tickingarea: "${Name}"; ${Area}`);
}

/**
 *
 * @param Command
 * @returns
 */
function ProcessBoxCommand(Command: Command, uri : string): GeneralInfo | undefined {
  //Tickingarea add <x> <y> <z> <x> <y> <z> [name]
  const parameters = Command.parameters;

  if (parameters.length < 8) return undefined;

  const Area = `[${parameters[2].text}, ${parameters[3].text}, ${parameters[4].text}, ${parameters[5].text}, ${parameters[6].text}, ${parameters[7].text}]`;
  let Name = "";
  let Loc : Location;

  if (parameters.length > 8) {
    Name = parameters[8].text;
    Loc = Location.create(uri, parameters[8].offset);
  } else {
    Loc = Location.create(uri, parameters[2].offset);
  }

  return GeneralInfo.create(Name, Loc, `The box tickingarea: "${Name}"; '${Area}'`);
}