import { SvelteComponentTyped } from "svelte";
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
        image?: {} | undefined;
        portrait?: boolean | undefined;
        noScroll?: boolean | undefined;
        thumbnail?: boolean | undefined;
        imagePreset?: boolean | undefined;
        escapeToClose?: boolean | undefined;
        clickToClose?: boolean | undefined;
        closeButton?: boolean | undefined;
        isVisible?: boolean | undefined;
        activeImage?: number | undefined;
        arrowsColor?: string | undefined;
        arrowsCharacter?: string | undefined;
        disableKeyboardArrowsControl?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        thumbnail: {};
        default: {
            [x: string]: any;
        };
    };
};
export declare type GalleryProps = typeof __propDef.props;
export declare type GalleryEvents = typeof __propDef.events;
export declare type GallerySlots = typeof __propDef.slots;
export default class Gallery extends SvelteComponentTyped<GalleryProps, GalleryEvents, GallerySlots> {
}
export {};
