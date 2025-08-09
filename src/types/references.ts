export interface References {
  defined: string[];
  using: string[];
}

export namespace References {
  export function empty(): References {
    return { defined: [], using: [] };
  }
}
