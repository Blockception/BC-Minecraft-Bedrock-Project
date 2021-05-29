import { MCProject } from "bc-minecraft-project";
import { Container } from "../Types/Container";

export class BehaviorPack implements Container {
  readonly Context: MCProject;

  public entities: Map<string, Entity>;

  constructor(Context: MCProject | string) {
    this.Context = typeof Context === "object" ? Context : MCProject.loadSync(Context);
  }
}
