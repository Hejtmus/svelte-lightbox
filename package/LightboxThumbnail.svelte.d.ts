/** @typedef {typeof __propDef.props}  LightboxThumbnailProps */
/** @typedef {typeof __propDef.events}  LightboxThumbnailEvents */
/** @typedef {typeof __propDef.slots}  LightboxThumbnailSlots */
export default class LightboxThumbnail extends SvelteComponentTyped<{
    [x: string]: any;
}, {
    click: MouseEvent;
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
        [x: string]: any;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
