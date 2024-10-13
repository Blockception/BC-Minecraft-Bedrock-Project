import { SMap } from "../../types";
import { FormatVersion } from "../types/FormatVersion";

/** */
export interface Particle extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  particle_effect: ParticleContainer;
}

/** */
export interface ParticleContainer {
  /** */
  description: ParticleDescription;
  /** */
  components: SMap<any>;
  events?: SMap<any>;
  curves?: SMap<any>;
}

/** */
export interface ParticleDescription {
  /** */
  identifier: string;
}

/**
 *
 */
export namespace Particle {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Particle {
    if (typeof value === "object" && typeof value.format_version === "string" && typeof value["particle_effect"] === "object") {
      const desc = value["particle_effect"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") {
        return true;
      }
    }

    return false;
  }
}
