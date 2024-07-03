import * as internal from "../../../Internal/BehaviorPack/Feature";
import { Json } from "../../../Internal/Json";
import { Molang } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../Types/Documentation";
import { TextDocument } from "../../../Types/TextDocument";
import { Feature } from "./Feature";

/**
 *
 * @param doc
 * @returns
 */
export function Process(doc: TextDocument): Feature | undefined {
    const uri = doc.uri;
    const content = doc.getText();
    const imp = Json.To<internal.Feature>(doc);

    if (!internal.Feature.is(imp)) return undefined;

    //@ts-ignore
    const container = imp[Object.keys(imp).filter(x => !x.startsWith('format_version'))[0]]
    const id = container.description.identifier;

    const out: Feature = {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        documentation: Documentation.getDoc(doc, () => `Feature: ${id}`),
    };

    return out;
}