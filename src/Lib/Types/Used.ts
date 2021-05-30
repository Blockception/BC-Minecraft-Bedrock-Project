export interface Using<T> {
  using: T[];
}

export namespace Using {
  export function create<T>(items: T[] | undefined = undefined): Using<T> {
    if (!items) {
      items = [];
    }

    return { using: [] };
  }
}
