/** @typedef {typeof __propDef.props}  LightboxProps */
/** @typedef {typeof __propDef.events}  LightboxEvents */
/** @typedef {typeof __propDef.slots}  LightboxSlots */
export default class Lightbox extends SvelteComponentTyped<{
    protect?: boolean | undefined;
    closeButton?: boolean | undefined;
    image?: {} | undefined;
    portrait?: boolean | undefined;
    imagePreset?: boolean | undefined;
    title?: string | undefined;
    description?: string | undefined;
    transitionDuration?: number | undefined;
    modalStyle?: string | undefined;
    modalClasses?: string | undefined;
    escapeToClose?: boolean | undefined;
    thumbnailClasses?: string | undefined;
    thumbnailStyle?: string | undefined;
    noScroll?: boolean | undefined;
    thumbnail?: boolean | undefined;
    clickToClose?: boolean | undefined;
    isVisible?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    thumbnail: {};
    default: {};
    image: {};
}> {
}
export type LightboxProps = typeof __propDef.props;
export type LightboxEvents = typeof __propDef.events;
export type LightboxSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        protect?: boolean | undefined;
        closeButton?: boolean | undefined;
        image?: {} | undefined;
        portrait?: boolean | undefined;
        imagePreset?: boolean | undefined;
        title?: string | undefined;
        description?: string | undefined;
        transitionDuration?: number | undefined;
        modalStyle?: string | undefined;
        modalClasses?: string | undefined;
        escapeToClose?: boolean | undefined;
        thumbnailClasses?: string | undefined;
        thumbnailStyle?: string | undefined;
        noScroll?: boolean | undefined;
        thumbnail?: boolean | undefined;
        clickToClose?: boolean | undefined;
        isVisible?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        thumbnail: {};
        default: {};
        image: {};
    };
};
export {};
