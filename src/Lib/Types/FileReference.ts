import * as fs from "fs";

export class FileReference {
  public uri: string;

  constructor(uri: string | undefined = undefined) {
    this.uri = uri ?? "";
  }

  getText(): string | undefined {
    let out = undefined;

    if (fs.existsSync(this.uri)) {
      try {
        const buff = fs.readFileSync(this.uri);
        out = buff.toString();
      } catch (err) {}
    }

    return out;
  }
}

export class JsonFileReference<T> extends FileReference {
  constructor(uri: string | undefined = undefined) {
    super(uri);
  }

  getObject(): T | undefined {
    return ToObject(this.getText());
  }
}

export class JsonFileSummarizedReference<T, U> extends JsonFileReference<T> {
  private __to_summary: (data: T) => U;

  constructor(to_summaryFn: (data: T) => U, uri: string | undefined = undefined) {
    super(uri);
    this.__to_summary = to_summaryFn;
  }

  getSummarizedObject(): U | undefined {
    const item = this.getObject();

    if (item) return this.__to_summary(item);

    return undefined;
  }
}

function ToObject<T>(data: string | undefined): T | undefined {
  if (!data) return undefined;

  let out = undefined;

  try {
    out = JSON.parse(data) as T;
  } catch (err) {}

  return out;
}
