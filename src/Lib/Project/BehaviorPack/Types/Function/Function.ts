import { Documentated } from "../../../../Types/Documentated";
import { Identifiable } from "../../../../Types/include";
import { Locatable } from "../../../../Types/Locatable";

export interface Function extends Identifiable, Documentated, Locatable {}
