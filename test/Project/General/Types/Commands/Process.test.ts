import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { ProjectData } from "../../../../../src/Lib/Project/ProjectData";
import { TextDocument } from "../../../../../src/Lib/Types/TextDocument/TextDocument";
import { TextProjectContext } from "../../../../Uttility";

describe("Commands", () => {
  it("mcfunction", () => {
    const P = new ProjectData(new TextProjectContext());

    P.BehaviorPacks.add("c:\\bp", MCProject.createEmpty());

    const doc: TextDocument = {
      uri: "c:\\bp\\functions\\example.mcfunction",
      getText: () => `tag @s add foo
scoreboard objectives add id dummy
tickingarea add 0 0 0 5 5 5 "main"
tickingarea add circle 1 2 3 5 foo
scoreboard players set global id 0`,
    };

    const out = P.process(doc);

    expect(out, "Pack").to.not.be.undefined;
    expect(P.BehaviorPacks.functions.get("example")).to.not.be.undefined;
    expect(P.General.tags.count()).to.equal(1);
    expect(P.General.objectives.count()).to.equal(1);
    expect(P.General.fakeEntities.count()).to.equal(1);
    expect(P.General.tickingAreas.count()).to.equal(2);
  });

  it("animation", () => {
    const P = new ProjectData(new TextProjectContext());

    P.BehaviorPacks.add("c:\\bp", MCProject.createEmpty());

    const doc: TextDocument = {
      uri: "c:\\bp\\animations\\example.animation.json",
      getText: () => `{
        "format_version": "1.10.0",
        "animations": {
          "animation.example.foo": {
            "animation_length": 4.5,
            "loop": false,
            "timeline": {
              "0.0": ["/tag @s add foo", "/scoreboard objectives add id dummy"],
              "1.0": ["/tickingarea add 0 0 0 5 5 5 \\"main\\""],
              "2.0": ["/tickingarea add circle 1 2 3 5 foo"],
              "3.0": ["/scoreboard players set global id 0"]
            }
          }
        }
      }`,
    };

    const out = P.process(doc);

    expect(out, "Pack").to.not.be.undefined;
    expect(P.BehaviorPacks.animations.get("animation.example.foo")).to.not.be.undefined;
    expect(P.General.tags.count()).to.equal(1);
    expect(P.General.objectives.count()).to.equal(1);
    expect(P.General.fakeEntities.count()).to.equal(1);
    expect(P.General.tickingAreas.count()).to.equal(2);
  });

  it("animation_controller", () => {
    const P = new ProjectData(new TextProjectContext());

    P.BehaviorPacks.add("c:\\bp", MCProject.createEmpty());

    const doc: TextDocument = {
      uri: "c:\\bp\\animation_controllers\\controller.example.json",
      getText: () => `{
        "format_version": "1.10.0",
        "animation_controllers": {
          "controller.animation.example": {
            "states": {
              "default": {
                "transitions": [{ "A": "query.has_armor_slot(0)" }, { "B": "query.has_armor_slot(1)" }, { "C": "query.has_armor_slot(2)" }, { "D": "query.has_armor_slot(3)" }]
              },
              "A": {
                "on_entry": ["/tag @s add foo", "/scoreboard objectives add id dummy"]
              },
              "B": {
                "on_entry": ["/tickingarea add 0 0 0 5 5 5 \\"main\\""]
              },
              "C": {
                "on_entry": ["/tickingarea add circle 1 2 3 5 foo"]
              },
              "D": {
                "on_entry": ["/scoreboard players set global id 0"]
              }
            }
          }
        }
      }`,
    };

    const out = P.process(doc);

    expect(out, "Pack").to.not.be.undefined;
    expect(P.BehaviorPacks.animation_controllers.get("controller.animation.example")).to.not.be.undefined;
    expect(P.General.tags.count()).to.equal(1);
    expect(P.General.objectives.count()).to.equal(1);
    expect(P.General.fakeEntities.count()).to.equal(1);
    expect(P.General.tickingAreas.count()).to.equal(2);
  });
});
