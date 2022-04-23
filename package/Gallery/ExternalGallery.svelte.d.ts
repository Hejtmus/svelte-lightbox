/** @typedef {typeof __propDef.props}  ExternalGalleryProps */
/** @typedef {typeof __propDef.events}  ExternalGalleryEvents */
/** @typedef {typeof __propDef.slots}  ExternalGallerySlots */
export default class ExternalGallery extends SvelteComponentTyped<{
    [x: string]: any;
    activeImage?: number | undefined;
    galleryArrowsColor?: string | undefined;
    galleryArrowsCharacter?: string | undefined;
    disableKeyboardArrowsControl?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        [x: string]: any;
    };
}> {
}
export type ExternalGalleryProps = typeof __propDef.props;
export type ExternalGalleryEvents = typeof __propDef.events;
export type ExternalGallerySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        activeImage?: number | undefined;
        galleryArrowsColor?: string | undefined;
        galleryArrowsCharacter?: string | undefined;
        disableKeyboardArrowsControl?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            [x: string]: any;
        };
    };
};
export {};
