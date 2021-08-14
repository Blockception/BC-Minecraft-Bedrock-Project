import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "../../../../Molang/MolangSet";
import { DefinedUsing } from "../../../../Types/Defined Using/include";

/** */
export interface AnimationController extends Types.Identifiable, Types.Documentated, Types.Locatable {
  /** */
  molang: MolangSet;
  /** */
  animations: DefinedUsing<string>;
}
