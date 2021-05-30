import { DefinedUsing } from "../Types/DefinedUsing";

export interface MolangSet {
  variables: DefinedUsing<string>;
  queries: DefinedUsing<string>;
}

export namespace MolangSet {
  export function create(): MolangSet {
    return {
      queries: DefinedUsing.create<string>(),
      variables: DefinedUsing.create<string>(),
    };
  }
}
