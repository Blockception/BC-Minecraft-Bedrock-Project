import { DataSet } from "../../Types/DataSet/include";
import { TextDocument } from "../../Types/TextDocument/TextDocument";
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

  /**
   *
   * @param doc
   * @returns
   */
  Process(doc: TextDocument) {
    const type = FileType.detect(doc.uri);

    switch (type) {
      case FileType.function:
        return ProcessMcFunction(doc, this);

      default:
        return this;
    }
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string) {
    let out = false;
    out ||= this.fakeEntities.deleteFile(uri);
    out ||= this.objectives.deleteFile(uri);
    out ||= this.tags.deleteFile(uri);
    out ||= this.tickingAreas.deleteFile(uri);

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;
    out ||= this.fakeEntities.deleteFolder(uri);
    out ||= this.objectives.deleteFolder(uri);
    out ||= this.tags.deleteFolder(uri);
    out ||= this.tickingAreas.deleteFolder(uri);

    return out;
  }
}
