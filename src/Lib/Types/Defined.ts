export interface Defined<T> {
  defined: T[];
}

export namespace Defined {
  export function create<T>(items: T[] | undefined = undefined): Defined<T> {
    if (!items) {
      items = [];
    }

    return { defined: [] };
  }
}
