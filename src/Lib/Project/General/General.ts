import { DataSet, TextDocument } from "../../Types/include";
import { FileType } from "../BehaviorPack/include";
import { ProcessMcFunction } from "./Types/Commands/Process";
import { GeneralInfo } from "./Types/GeneralInfo";

/**
 *
 */
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

  Process(doc: TextDocument) {
    const type = FileType.detect(doc.uri);

    switch (type) {
      case FileType.function:
        return ProcessMcFunction(doc, this);

      default:
        return this;
    }
  }
}
