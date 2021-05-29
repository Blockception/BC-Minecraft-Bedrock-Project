import { MCProject } from "bc-minecraft-project";

export interface Container {
  /**The nessacary Minecraft project data
   *
   */
  readonly Context: MCProject;
}

export namespace Container {
  export function is(value: any): value is Container {
    if (value && MCProject.is(value.Context)) return true;

    return false;
  }
}
