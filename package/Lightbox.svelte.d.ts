import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
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
        imagePreset?: boolean | undefined;
        escapeToClose?: boolean | undefined;
        clickToClose?: boolean | undefined;
        closeButton?: boolean | undefined;
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
export declare type LightboxProps = typeof __propDef.props;
export declare type LightboxEvents = typeof __propDef.events;
export declare type LightboxSlots = typeof __propDef.slots;
export default class Lightbox extends SvelteComponentTyped<LightboxProps, LightboxEvents, LightboxSlots> {
}
export {};
