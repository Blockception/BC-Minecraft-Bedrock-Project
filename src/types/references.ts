export type References = Defined & Using;

export interface Defined {
  defined: Set<string>;
}

export interface Using {
  using: Set<string>;
}
export namespace References {
  export function is(v: any): v is References {
    return v?.using instanceof Set && v?.defined instanceof Set;
  }
  export function create(): References {
    return { defined: new Set(), using: new Set() };
  }
  export function wrap(using?: Set<string> | Iterable<string>, defined?: Set<string> | Iterable<string>): References {
    return {
      using: using instanceof Set ? using : new Set(using),
      defined: defined instanceof Set ? defined : new Set(defined),
    };
  }
}

export namespace Defined {
  export function is(v: any): v is Defined {
    return v?.defined instanceof Set;
  }
  export function create(): Defined {
    return { defined: new Set() };
  }
  export function wrap(data: Set<string> | Iterable<string>): Defined {
    return { defined: data instanceof Set ? data : new Set(data) };
  }
  export function add(defined: Defined, data: Iterable<string> | null | undefined): void;
  export function add<T>(defined: Defined, data: Iterable<T> | null | undefined, transfn: (item: T) => string): void;

  export function add<T>(defined: Defined, data: Iterable<T> | null | undefined, transfn?: (item: T) => string): void {
    if (!data) return;
    if (transfn) {
      for (const item of data) {
        defined.defined.add(transfn(item));
      }
    } else {
      for (const item of data) {
        defined.defined.add(item as string);
      }
    }
  }
}

export namespace Using {
  export function is(v: any): v is Using {
    return v?.using instanceof Set;
  }
  export function create(): Using {
    return { using: new Set() };
  }
  export function wrap(data: Set<string> | Iterable<string>): Using {
    return { using: data instanceof Set ? data : new Set(data) };
  }
  export function add(using: Using, data: Iterable<string> | null | undefined): void;
  export function add<T>(using: Using, data: Iterable<T> | null | undefined, transfn: (item: T) => string): void;

  export function add<T>(using: Using, data: Iterable<T> | null | undefined, transfn?: (item: T) => string): void {
    if (!data) return;
    if (transfn) {
      for (const item of data) {
        using.using.add(transfn(item));
      }
    } else {
      for (const item of data) {
        using.using.add(item as string);
      }
    }
  }
}
