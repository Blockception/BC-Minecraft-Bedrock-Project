import { MCProject } from "bc-minecraft-project";

export interface Container {
  /**The nessacary Minecraft project data*/
  context: MCProject;
}

export namespace Container {
  export function is(value: any): value is Container {
    if (value && MCProject.is(value.context)) return true;

    return false;
  }
}
