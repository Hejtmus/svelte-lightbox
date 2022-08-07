import { SvelteComponentTyped } from "svelte";
import type { LightboxCustomization, ImagePreset } from './Types';
declare const __propDef: {
    props: {
        title?: string | undefined;
        description?: string | undefined;
        imagePreset?: ImagePreset | undefined;
        customization?: {} | LightboxCustomization | undefined;
        transitionDuration?: number | undefined;
        keepBodyScroll?: boolean | undefined;
        enableImageExpand?: boolean | undefined;
        enableFallbackThumbnail?: boolean | undefined;
        enableEscapeToClose?: boolean | undefined;
        enableClickToClose?: boolean | undefined;
        showCloseButton?: boolean | undefined;
        isVisible?: boolean | undefined;
        programmaticController?: {
            toggle: () => void;
            open: () => void;
            close: () => void;
        } | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        thumbnail: {};
        default: {};
    };
};
export declare type LightboxProps = typeof __propDef.props;
export declare type LightboxEvents = typeof __propDef.events;
export declare type LightboxSlots = typeof __propDef.slots;
export default class Lightbox extends SvelteComponentTyped<LightboxProps, LightboxEvents, LightboxSlots> {
    get programmaticController(): {
        toggle: () => void;
        open: () => void;
        close: () => void;
    };
}
export {};
