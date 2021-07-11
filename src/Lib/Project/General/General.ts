import { DataSet } from "../../Types/include";
import { GeneralInfo } from "./Types/GeneralInfo";

export class GeneralCollection {
  /** */
  readonly fakeEntities: DataSet<GeneralInfo>;
  /** */
  readonly objectives: DataSet<GeneralInfo>;
  /** */
  readonly tags: DataSet<GeneralInfo>;
  /** */
  readonly tickingAreas: DataSet<GeneralInfo>;

  constructor() {
    this.fakeEntities = new DataSet();
    this.objectives = new DataSet();
    this.tags = new DataSet();
    this.tickingAreas = new DataSet();
  }
}
