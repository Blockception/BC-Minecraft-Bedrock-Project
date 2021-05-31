import * as fs from "fs";

export namespace Json {
  /**
   *
   * @param filepath
   * @param ensureFn
   * @returns
   */
  export function load<T>(filepath: string, ensureFn?: (item: T) => void): T | undefined {
    let out: T | undefined = undefined;

    try {
      const content = fs.readFileSync(filepath).toString();
      out = JSON.parse(content);

      if (out && ensureFn) ensureFn(out);
    } catch (err) {}

    return out;
  }
}
