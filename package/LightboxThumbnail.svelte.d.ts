/** @typedef {typeof __propDef.props}  LightboxThumbnailProps */
/** @typedef {typeof __propDef.events}  LightboxThumbnailEvents */
/** @typedef {typeof __propDef.slots}  LightboxThumbnailSlots */
export default class LightboxThumbnail extends SvelteComponentTyped<{
    class?: string | undefined;
    style?: string | undefined;
    protect?: boolean | undefined;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type LightboxThumbnailProps = typeof __propDef.props;
export type LightboxThumbnailEvents = typeof __propDef.events;
export type LightboxThumbnailSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        style?: string | undefined;
        protect?: boolean | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
