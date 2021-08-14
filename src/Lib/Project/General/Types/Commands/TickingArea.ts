/**
 *
 * @param Command
 * @returns
 */
export function ProcessTickingAreaCommand(Command: Command): void {
  //tickingarea add
  if (Command.parameters[1]?.text !== "add") return;

  //tickingarea add circle
  if (Command.parameters[2]?.text === "circle") {
    ProcessCircleCommand(Command);
  } else {
    ProcessBoxCommand(Command);
  }
}

/**
 *
 * @param Command
 * @returns
 */
function ProcessCircleCommand(Command: Command): void {
  //Tickingarea add circle <x> <y> <z> <r> [name]
  const parameters = Command.parameters;

  if (parameters.length < 7) return;

  let Area = "x: " + parameters[3].text + "y: " + parameters[4].text + "z: " + parameters[5].text + "; radius: " + parameters[6].text;
  let Name = "";
  const uri = Command.parameters[0].location.uri;

  let Location: Location;

  if (parameters.length > 7) {
    Name = parameters[7].text;
    Location = parameters[7].location;
  } else {
    Location = {
      uri: uri,
      range: {
        start: parameters[3].location.range.start,
        end: parameters[6].location.range.end,
      },
    };
  }

  Create(Location, Name, 'The circular tickingarea: "' + Name + '"; ' + Area);
}

/**
 *
 * @param Command
 * @returns
 */
function ProcessBoxCommand(Command: Command): void {
  //Tickingarea add <x> <y> <z> <x> <y> <z> [name]
  const parameters = Command.parameters;

  if (parameters.length < 8) return;

  let Area = "x: " + parameters[2].text + "y: " + parameters[3].text + "z: " + parameters[4].text + ";";
  Area += "x: " + parameters[5].text + "y: " + parameters[6].text + "z: " + parameters[7].text + ";";
  let Name = "";
  const uri = Command.parameters[0].location.uri;

  let Location: Location;

  if (parameters.length > 8) {
    Name = parameters[8].text;
    Location = parameters[8].location;
  } else {
    Location = {
      uri: uri,
      range: {
        start: parameters[2].location.range.start,
        end: parameters[7].location.range.end,
      },
    };
  }

  Create(Location, Name, 'The box tickingarea: "' + Name + '"; ' + Area);
}

/**
 *
 * @param Loc
 * @param Name
 * @param Doc
 */
function Create(Loc: Location, Name: string, Doc: string): void {
  let Ta = new Tickingarea();
  Ta.Location = Loc;
  Ta.Identifier = Name;
  Ta.Documentation.value = Doc;

  Console.Info("Found ticking area: " + Name);
  Database.ProjectData.General.TickingAreas.Set(Ta);
}
