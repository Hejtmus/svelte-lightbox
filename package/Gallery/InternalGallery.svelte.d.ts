/** @typedef {typeof __propDef.props}  InternalGalleryProps */
/** @typedef {typeof __propDef.events}  InternalGalleryEvents */
/** @typedef {typeof __propDef.slots}  InternalGallerySlots */
export default class InternalGallery extends SvelteComponentTyped<{
    imagePreset?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type InternalGalleryProps = typeof __propDef.props;
export type InternalGalleryEvents = typeof __propDef.events;
export type InternalGallerySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        imagePreset?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
