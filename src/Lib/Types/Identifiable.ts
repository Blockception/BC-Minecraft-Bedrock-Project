export interface Identifiable {
  readonly id: string;
}

export namespace Identifiable {
  export function has<T extends Identifiable>(items: T[], id: string): boolean {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id == id) return true;
    }

    return false;
  }

  export function get<T extends Identifiable>(items: T[], id: string): T | undefined {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id == id) return elem;
    }

    return undefined;
  }
}
