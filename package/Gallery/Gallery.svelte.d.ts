import { SvelteComponentTyped } from "svelte";
import type { GalleryArrowCharacter, ImagePreset } from '../Types';
declare const __propDef: {
    props: {
        [x: string]: any;
        thumbnailClasses?: string | undefined;
        thumbnailStyle?: string | undefined;
        modalClasses?: string | undefined;
        modalStyle?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        transitionDuration?: number | undefined;
        protect?: boolean | undefined;
        portrait?: boolean | undefined;
        noScroll?: boolean | undefined;
        imagePreset?: "" | ImagePreset | undefined;
        escapeToClose?: boolean | undefined;
        clickToClose?: boolean | undefined;
        closeButton?: boolean | undefined;
        isVisible?: boolean | undefined;
        activeImage?: number | undefined;
        arrowsColor?: string | undefined;
        arrowsCharacter?: GalleryArrowCharacter | undefined;
        disableKeyboardArrowsControl?: boolean | undefined;
        generateFallbackThumbnails?: boolean | undefined;
        programmaticController?: {
            toggle: () => void;
            open: () => void;
            close: () => void;
            openImage: (imageId: any) => void;
        } | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        thumbnail: {};
        lightbox: {};
        default: {
            [x: string]: any;
        };
    };
};
export declare type GalleryProps = typeof __propDef.props;
export declare type GalleryEvents = typeof __propDef.events;
export declare type GallerySlots = typeof __propDef.slots;
export default class Gallery extends SvelteComponentTyped<GalleryProps, GalleryEvents, GallerySlots> {
    get programmaticController(): {
        toggle: () => void;
        open: () => void;
        close: () => void;
        openImage: (imageId: any) => void;
    };
}
export {};
