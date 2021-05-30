import { MCProject } from "bc-minecraft-project";
import { Container } from "../Types/Container";
import { DataSet } from "../Types/DataSet";
import { Edu, Types, Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { Entity } from "./Types/Entity/Entity";

export class BehaviorPack implements Container {
  readonly Context: MCProject;

  public entities: DataSet<Entity, Types.BehaviorPack.Entity>;

  constructor(Context: MCProject | string) {
    this.Context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.entities = DataSet.createID(Vanilla.BehaviorPack.Entities, Edu.BehaviorPack.Entities, this);
  }
}
