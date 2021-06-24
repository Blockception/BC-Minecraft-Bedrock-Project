import { DataContent } from "./DataContent";

/** */
export namespace RegularExpression {
  /**
   *
   * @param data
   * @param regexp
   * @param receiver
   */
  export function harvest(data: DataContent, regexp: RegExp, receiver: string[]): void {
    if (typeof data === "string") data = [data];

    if (Array.isArray(data)) {
      harvestArray(data, regexp, receiver);
    } else {
      harvestObject(data, regexp, receiver);
    }
  }

  /**
   *
   * @param data
   * @param regexp
   * @param receiver
   */
  export function harvestArray(data: string[] | { [key: string]: string }[], regexp: RegExp, receiver: string[]): void {
    for (let I = 0; I < data.length; I++) {
      const elem = data[I];

      if (typeof elem === "string") {
        harvestString(elem, regexp, receiver);
      } else {
        harvestObject(elem, regexp, receiver);
      }
    }
  }

  /**
   *
   * @param data
   * @param regexp
   * @param receiver
   */
  export function harvestObject(data: { [key: string]: string }, regexp: RegExp, receiver: string[]): void {
    const keys = Object.getOwnPropertyNames(data);
    for (let I = 0; I < keys.length; I++) {
      const elem = data[I];

      if (typeof elem === "string") harvestString(elem, regexp, receiver);
    }
  }

  /**
   *
   * @param data
   * @param regexp
   * @param receiver
   */
  export function harvestString(data: string, regexp: RegExp, receiver: string[]): void {
    let matches = regexp.exec(data);

    while (matches) {
      if (matches && matches.length >= 2) {
        const v = matches[1];

        if (!receiver.includes(v)) receiver.push(v);
      }

      matches = regexp.exec(data);
    }
  }
}
